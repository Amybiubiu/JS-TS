const promise = new Promise(
    (resolve,reject) =>{
        setTimeout(()=>{reject("Yoshi")},500);
    }
);
promise.then(
    val => console.log("success:" + val)
).catch(e =>{ console.log("error:" + e)});