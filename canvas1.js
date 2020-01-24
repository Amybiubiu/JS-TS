let cx = document.querySelector("canvas").getContext("2d");
function drawTiXing(x1, y1, w1, x2, y2, w2) {
    cx.beginPath();
    cx.moveTo(x1,y1);
    cx.lineTo(x1+w1,y1);
    cx.moveTo(x1,y1);
    cx.lineTo(x2,y2);
    cx.lineTo(x2+w2,y2);
    cx.closePath();
    cx.stroke();
};
drawTiXing(1, 0, 3, 0, 4, 5);

function drawRect(o1,o2,w){
    cx.fillStyle = "red";
    cx.fillRect(o1,o2,o1+w,o2+w);
    cx.rotate(0.5 * Math.PI);
}
drawRect(0,0,3);

function drawJuChiLine(w,h,n){
    cx.beginPath();
    for(var i=0;i<n;i++){
        if(i%2==0)
            cx.lineTo(w,h);
        else
            cx.lineTo(-w,h);
    }
}
drawJuChiLine(8,2,10);