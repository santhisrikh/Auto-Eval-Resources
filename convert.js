let data = require("./b18-c2-parttime/pt-web06-c3.json");
let fs = require("fs");

let newData = data.sort((a, b) =>
  a.title > b.title ? 1 : b.title > a.title ? -1 : 0
);

let logData = newData.map((ele) => ({
  student_code: ele.title.trim().split(" ")[0],
  ...ele,
  testCommands: "",
}));
fs.writeFile(
  "b18-c2-parttime/ptweb06-logs.json",
  JSON.stringify(logData),
  (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  }
);
