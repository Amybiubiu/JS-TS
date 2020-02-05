var {parse} = require("url");

module.exports = class Router {
  constructor() {
    this.routes = [];
  }
  //how to call handler ?
  //handler is defined when it added
  //by .resolve
  //handle usually return a response with header and body
  add(method, url, handler) {
    this.routes.push({method, url, handler});
  }
  resolve(context, request) {
    let path = parse(request.url).pathname;

    for (let {method, url, handler} of this.routes) {
      let match = url.exec(path);
      if (!match || request.method != method) continue;
      // why do like this, why encode and then decode?because request need formated
      // ...[1,2,3] -> 1 2 3
      // /talks/How to Idle <- talks How%20to%20Idle ?
      // when no matching url,will not handle
      let urlParts = match.slice(1).map(decodeURIComponent);
      return handler(context, ...urlParts, request);
    }
    return null;
  }
};
