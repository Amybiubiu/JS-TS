let cx = document.querySelector("canvas").getContext("2d");
function drawTiXing(x1, y1, w1, x2, y2, w2) {
    cx.beginPath();
    cx.moveTo(x1,y1);
    cx.lineTo(x1+w1,y1);
    cx.lineTo(x2+w2,y2);
    cx.lineTo(x2,y2);
    cx.closePath();
    cx.stroke();
};
drawTiXing(100, 0, 300, 0, 400, 500);

function drawRect(o1,o2,w){
    cx.translate(o1,o2);
    cx.rotate(0.25 * Math.PI);
    cx.fillStyle = "red";
    cx.fillRect(0,0,w,w);
    cx.resetTransform();
}
drawRect(200,30,50);

function drawJuChiLine(w,h,n){
    cx.beginPath();
    for(var i=0;i<n;i++){
        if(i%2==0)
            cx.lineTo(w,h+i*h+4);
        else
            cx.lineTo(0,h+i*h+8);
    };
    cx.stroke();
}
drawJuChiLine(40,30,10);

function diamond(x, y) {
    cx.translate(x + 30, y + 30);
    cx.rotate(Math.PI / 4);
    cx.fillStyle = "red";
    cx.fillRect(-30, -30, 60, 60);
    cx.resetTransform();
  }
  diamond(140, 30);