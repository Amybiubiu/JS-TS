function *main(){
    var x = yield "hello world";
    console.log(x);
}
var it = main();
it.next();
it.next("a");   //a
