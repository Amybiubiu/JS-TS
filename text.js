function foo(){
    console.log(this.a);
}
var obj ={
    a:2
};
var fn = foo.call(obj);
fn();
