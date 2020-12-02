const list = [1, 2, 3]
const square = num => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num)
    }, 1000)
  })
}

async function test() {
  for(var i = 0; i < list.length; i++){
      var res = await square(list[i]);
      console.log(res);
  }
}
test()