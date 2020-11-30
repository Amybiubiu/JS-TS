interface Name {
  firstname: string;
  lastname: string;
  [props: string]: any;
}

function showName(name: Name) {
  console.log(name.firstname + name.lastname);
}

showName({ firstname: "Lucy", lastname: "J", love: "ok" });
