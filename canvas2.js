const results = [
  {name: "Satisfied", count: 1043, color: "lightblue"},
  {name: "Neutral", count: 563, color: "lightgreen"},
  {name: "Unsatisfied", count: 510, color: "pink"},
  {name: "No comment", count: 175, color: "silver"}
];
let cx = document.querySelector("canvas").getContext("2d");
let total = results
  .reduce((sum, {count}) => sum + count, 0);
let currentAngle = -0.5 * Math.PI;
let centerX = 300, centerY = 150;

// Add code to draw the slice labels in this loop.
for (let result of results) {
  let sliceAngle = (result.count / total) * 2 * Math.PI;
  cx.beginPath();
  cx.arc(centerX, centerY, 100,
         currentAngle, currentAngle + sliceAngle);
  
  let arcMiddle = currentAngle + 0.5*sliceAngle;
  cx.textBaseLine = "middle";
  if(Math.cos(arcMiddle) > 0){
      cx.textAlign = "left";
  }else
    cx.textAlign = "right";
  let textX = Math.cos(arcMiddle)*130 + centerX;
  let textY = Math.sin(arcMiddle)*130 + centerY;
  cx.font = "15px sans-serif";
  cx.fillStyle = "black";
  cx.fillText(result.name,textX,textY);
  
  currentAngle += sliceAngle;
  cx.lineTo(centerX, centerY);
  cx.fillStyle = result.color;
  cx.fill();
}