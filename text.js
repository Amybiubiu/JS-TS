function useless(callback){
    return callback();
}
useless(()=>{console.log("callback")});
(function fnA(){
    console.log("fnA");
})()