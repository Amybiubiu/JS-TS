interface name {
  firstname: string;
  lastname: string;
}

function showName(name: name) {
  console.log(name.firstname + name.lastname);
}

showName({ firstname: "Lucy" });
