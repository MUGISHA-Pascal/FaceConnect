// ? some errors
import fs from "fs";
import inquirer from "inquirer";
import chalk from "chalk";
const pathoffile = "./data.json";
function loadData() {
  try {
    var data = fs.readFileSync(pathoffile);
    return JSON.parse(data.toString());
  } catch (e) {
    return [];
  }
}
function saveData(data) {
  fs.writeFileSync(pathoffile, JSON.stringify(data));
}
function mainMenu() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "action",
        message: "what do you want to do :",
        choices: ["Create", "Read", "Update", "Delete", "Exit"],
      },
    ])
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
          process.exit();
        default:
          mainMenu();
          break;
      }
    });
}

function createRecord() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "enter the name ? :",
      },
      {
        type: "input",
        name: "age",
        message: "enter the age ? :",
      },
    ])
    .then((answers) => {
      const data = loadData();
      data.push({ id: Date.now().toString(), ...answers });
      saveData(data);
      mainMenu();
    });
}

function readRecord() {
  const data = loadData();
  console.log(chalk.yellow("the records are :"));
  data.forEach((record) => {
    console.log(
      chalk.green(
        `the id : ${record.id} , the name : ${record.name} and the age : ${record.age}`
      )
    );
  });
  mainMenu();
}

function updateRecord() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "enter the id for the record to update ? :",
      },

      {
        type: "input",
        name: "name",
        message: "enter the new name ? :",
      },
      {
        type: "input",
        name: "age",
        message: "enter the new age ? :",
      },
    ])
    .then((answers) => {
      const data = loadData();
      const index = data.findIndex((record) => answers.id === record.id);
      data[index] = { id: answers.id, name: answers.name, age: answers.age };
      saveData(data);
      mainMenu();
    });
}

function deleteRecord() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "enter the id for the record to delete ? :",
      },
    ])
    .then((answers) => {
      const data = loadData();
      const newdata = data.filter((record) => {
        record.id !== answers.id;
      });
      if (newdata.length !== data.length) {
        saveData(newdata);
      }
      mainMenu();
    });
}
mainMenu();
