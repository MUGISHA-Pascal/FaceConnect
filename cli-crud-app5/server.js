import inquirer from "inquirer";
import fs from "fs";
import chalk from "chalk";

const pathoffiles = "./data.json";

function loadData() {
  try {
    const data = fs.readFileSync(pathoffiles);
    return JSON.parse(data.toString());
  } catch (e) {
    return [];
  }
}

function saveData(data) {
  fs.writeFileSync(pathoffiles, data);
}

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "action",
        message: "What do you want to do : ",
        choices: ["Create", "Read", "Update", "Delete"],
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
        message: "Enter the name ? :",
      },
      {
        type: "input",
        name: "age",
        message: "Enter the age ? :",
      },
    ])
    .then((answers) => {
      const data = loadData();
      data.push({ id: Date.now().toString(), ...answers });
      saveData(JSON.stringify(data));
      console.log(chalk.green("data create successfully"));
      mainMenu();
    });
}

function readRecord() {
  const data = loadData();
  data.forEach((record) => {
    console.log(
      chalk.yellow(
        `id : ${record.id} , name : ${record.name} and age : ${record.age}`
      )
    );
    mainMenu();
  });
}

function updateRecord() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "enter the id of the record to update ? : ",
      },

      {
        type: "input",
        name: "name",
        message: "enter the new name ? : ",
      },

      {
        type: "input",
        name: "age",
        message: "enter the new age ? : ",
      },
    ])
    .then((answers) => {
      const data = loadData();
      const index = data.findIndex((record) => record.id === answers.id);
      data[index] = { id: answers.id, name: answers.name, age: answers.age };
      saveData(JSON.stringify(data));
      console.log(chalk.green("data is successively updated"));
      mainMenu();
    });
}

function deleteRecord() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "enter the id for the record you want to update ? : ",
      },
    ])
    .then((answers) => {
      const data = loadData();
      const newdata = data.filter((record) => record.id != answers.id);
      saveData(JSON.stringify(newdata));
      console.log(chalk.green("data is deleted successively"));
      mainMenu();
    });
}

mainMenu();
