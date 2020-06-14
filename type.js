var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
})(Color || (Color = {}));
console.log("Color.Red " + Color.Red);
console.log("Color[1] " + Color[1]);
