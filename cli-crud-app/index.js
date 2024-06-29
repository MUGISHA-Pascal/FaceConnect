const fs = require("fs");
const inquirer = require("inquirer");
const chalk = require("chalk");

const dataFilePath = "./data.json";

function loadData() {
  try {
    const databuffer = fs.readFileSync(dataFilePath);
    return JSON.parse(dataBuffer.toString());
  } catch (e) {
    return [];
  }
}

function saveData(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data));
}

function mainMenu() {
  inquirer
    .prompt({
      type: "input",
      name: "action",
      message: "what would you like to do ? ",
      choices: ["Create", "Read", "Update", "Delete", "Exit"],
    })
    .then((answers) => {
      switch (answers.action) {
        case "Create":
          createRecord();
          break;
        case "Read":
          readRecord();
          break;
        case "Update":
          updateRecord();
          break;
        case "Delete":
          deleteRecord();
          break;
        case "Exit":
          console.log(chalk.green("Goodbye!"));
      }
    });
}
