//写法1
exports.hello = function(){
    console.log('world');
}

//写法2
var f = {
    hello : function(){
        console.log('world');
    }
}

module.exports = f;

// 调用
var h = require('hello');
h.hello();