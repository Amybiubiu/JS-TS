// tsConfig: {"noImplicitAny":false}
function add(a, b) {
    return a + b;
}
var three = add(1, 2); // Type is number
var twelve = add("1", "2"); // Type is string
