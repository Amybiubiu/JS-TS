var {createServer} = require("http");
var Router = require("./router");
var ecstatic = require("ecstatic");
const {readFileSync, writeFile} = require("fs");

var router = new Router();
var defaultHeaders = {"Content-Type": "text/plain"};

var SkillShareServer = class SkillShareServer {
  constructor(talks) {
    this.talks = talks;
    this.version = 0;
    this.waiting = [];
    
    //listen on request from client,and response it
    //combine router event return content understand it????
    //content: {status: 404, body: `No talk '${title}' found`};
    //.then() use it
    let fileServer = ecstatic({root: "./public"});
    this.server = createServer((request, response) => {
      let resolved = router.resolve(this, request);
      if (resolved) {
        resolved.catch(error => {
          if (error.status != null) return error;
          return {body: String(error), status: 500};
        }).then(({body,
                  status = 200,
                  headers = defaultHeaders}) => {
          response.writeHead(status, headers);
          response.end(body);
        });
      } else {
        fileServer(request, response);
      }
    });
  }
  start(port) {
    this.server.listen(port);
  }
  stop() {
    this.server.close();
  }
}

// router = new router()
const talkPath = /^\/talks\/([^\/]+)$/;

// talks/title/
router.add("GET", talkPath, async (server, title) => {
  if (title in server.talks) {
    return {body: JSON.stringify(server.talks[title]),
            headers: {"Content-Type": "application/json"}};
  } else {
    return {status: 404, body: `No talk '${title}' found`};
  }
});

router.add("DELETE", talkPath, async (server, title) => {
  if (title in server.talks) {
    delete server.talks[title];
    //will call talkResponse,before talkResponse will need some waiting minute,which
    //effected by this.waiting
    server.updated();
  }
  return {status: 204};
});

function readStream(stream) {
  return new Promise((resolve, reject) => {
    let data = "";
    stream.on("error", reject);
    stream.on("data", chunk => data += chunk.toString());
    stream.on("end", () => resolve(data));
  });
}
//add a new title to the talk
router.add("PUT", talkPath,
           async (server, title, request) => {
  let requestBody = await readStream(request);
  let talk;
  // data from client request body
  try { talk = JSON.parse(requestBody); }
  catch (_) { return {status: 400, body: "Invalid JSON"}; }

  if (!talk ||
      typeof talk.presenter != "string" ||
      typeof talk.summary != "string") {
    return {status: 400, body: "Bad talk data"};
  }
  server.talks[title] = {title,
                         presenter: talk.presenter,
                         summary: talk.summary,
                         comments: []};
  server.updated();
  return {status: 204};
});
//add new commment data to the title
//client need provide path with talk/comment,and body with valid property
router.add("POST", /^\/talks\/([^\/]+)\/comments$/,
           async (server, title, request) => {
  let requestBody = await readStream(request);
  let comment;
  try { comment = JSON.parse(requestBody); }
  catch (_) { return {status: 400, body: "Invalid JSON"}; }

  if (!comment ||
      typeof comment.author != "string" ||
      typeof comment.message != "string") {
    return {status: 400, body: "Bad comment data"};
  } else if (title in server.talks) {
    server.talks[title].comments.push(comment);
    server.updated();
    return {status: 204};
  } else {
    return {status: 404, body: `No talk '${title}' found`};
  }
});
//talkResponse
//[{"title":"dhsk","presenter":"Any","summary":"sjbdak","comments":[{"author":"Any","message":"速度快"},
//{"author":"Any","message":"收到"}]},{"title":"阿四大皆空","presenter":"Any","summary":"","comments":[]}]
SkillShareServer.prototype.talkResponse = function() {
  let talks = [];
  for (let title of Object.keys(this.talks)) {
    // add server.talk data at there
    talks.push(this.talks[title]);
  }
  return {
    body: JSON.stringify(talks),
    headers: {"Content-Type": "application/json",
              "ETag": `"${this.version}"`}
  };
};

// talk/
router.add("GET", /^\/talks$/, async (server, request) => {
  let tag = /"(.*)"/.exec(request.headers["if-none-match"]);
  //what is prefer format? a array ,wait[1]
  let wait = /\bwait=(\d+)/.exec(request.headers["prefer"]);
  if (!tag || tag[1] != server.version) {
    return server.talkResponse();
  } else if (!wait) {
    return {status: 304};
  } else {
    //set delayTime
    //设置请求最多等待的时间？那如果没被调用update呢？new Promise是个什么？？？？
    return server.waitForChanges(Number(wait[1]));
    //将回调函数responseTalk 添加至waiting queue，定时查看其是否被响应
    //update 时进行responseTalk 响应
    //而update是在调用其他的API时处理，so update 是在一并处理请求？
    //resolve({status: 304});
    //this.waiting.forEach(resolve => resolve(response));
    // { body: JSON.stringify(talks), headers: {"Content-Type": "application/json", "ETag": `"${this.version}"`}};
    // client 回调用resolve.then();
  }
});

//What is waiting's function ?
SkillShareServer.prototype.waitForChanges = function(time) {
  //what is resolve content???
  //用于延迟请求的回调函数存储在服务器的waiting数组中，以便在发生事件时通知它们。

  //这个回调函数是this.talkResponse?! http://es6.ruanyifeng.com/#docs/promise
  //waitForChanges方法也会立即设置一个定时器，当请求等待了足够长时，以 304 状态来响应。
  return new Promise(resolve => { //tag1?????
    // add to response queue as order time
    this.waiting.push(resolve);
    setTimeout(() => {
      //this.waiting.forEach(resolve => resolve(response));
      // { body: JSON.stringify(talks), headers: {"Content-Type": "application/json", "ETag": `"${this.version}"`}};
      //this.waiting = [];
      //也有可能是通过filter对waiting数组进行了更改
      if (!this.waiting.includes(resolve)) return;

      //一直没得到响应，去除请求，返回304
      //过滤？？？不过是每个resolve不都一样的么？为一个function
      //每次都是新的promise实例，所以resolve不同？
      this.waiting = this.waiting.filter(r => r != resolve);
      resolve({status: 304});
    }, time * 1000);
  });
};
const fileName = "./talks.json";

SkillShareServer.prototype.updated = function() {
  this.version++;
  let response = this.talkResponse();
  //excute response queue
  this.waiting.forEach(resolve => resolve(response)); //tag1????
  this.waiting = [];
  writeFile(fileName,JSON.stringify(this.talks),e =>{if(e) throw(e);});
};

//Error: ENOENT: no such file or directory, open './talks.json'
//at Object.openSync (fs.js:440:3)
//at readFileSync (fs.js:342:35)
// function loadTalks() {
//     readFileSync(fileName,"utf8",(error,text)=>{
//       if(error) return Object.create(null);
//       else{
//         let json = JSON.parse(text);
//         return Object.assign(Object.create(null), json);
//       }
//     })
// }

function loadTalks() {
  let json;
  try {
    json = JSON.parse(readFileSync(fileName, "utf8"));
  } catch (e) {
    json = {};
  }
  return Object.assign(Object.create(null), json);
}

//new SkillShareServer(Object.create(null)).start(8000);
new SkillShareServer(loadTalks()).start(8000);

