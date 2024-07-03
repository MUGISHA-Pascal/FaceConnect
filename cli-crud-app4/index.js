import fs from "fs";
import inquirer from "inquirer";
import chalk from "chalk";
pathoffile = "./data.json";
function loadData() {
  try {
    var data = fs.readFileSync();
    return JSON.parse(data).toString();
  } catch (e) {
    return [];
  }
}
function saveData(data) {
  fs.writeFileSync(data);
}
function mainMenu() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "enter the name :",
    },

    {
      type: "input",
      name: "age",
      message: "enter the age : ",
    },
  ]);
}
