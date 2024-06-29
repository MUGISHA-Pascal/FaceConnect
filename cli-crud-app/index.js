import fs from "fs";
import inquirer from "inquirer";
import chalk from "chalk";
const dataFilePath = "./data.json";

function loadData() {
  try {
    const dataffer = fs.readFileSync(dataFilePath);
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
        message: "Enter the name : ",
      },

      {
        type: "input",
        name: "age",
        message: "Enter the age : ",
      },
    ])
    .then((answers) => {
      const data = loadData();
      data.push({ id: Date.now().toString(), ...answers });
      saveData(data);
      console.log(chalk.green("Record created successfully !"));
      mainMenu();
    });
}

function readRecord() {
  const data = loadData();
  console.Console(chalk.blue("Records : "));
  data.forEach((record) => {
    console.log(
      chalk.yellow(
        `Id : ${record.id} , name: ${record.name} ,age : ${record.age}`
      )
    );
  });
  mainMenu();
}

function updateRecord() {
  const data = loadData();
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "Enter the ID of the record to update : ",
      },
      {
        type: "input",
        name: "name",
        message: "Enter the new name : ",
      },

      {
        type: "input",
        name: "age",
        message: "Enter the new age : ",
      },
    ])
    .then((answers) => {
      const index = data.findIndex((record) => record.id === answers.id);
      if (index !== -1) {
        data[index] = { id: answers.id, name: answers.name, age: answers.age };
        saveData(data);
        console.log(chalk.green("Record updated successfully !"));
      } else {
        console.log(chalk.red("Record not found !"));
      }
      mainMenu();
    });
}

function deleteRecord() {
  const data = loadData();
  inquirer
    .prompt({
      type: "input",
      name: "id",
      message: "Enter the ID of the record to delete : ",
    })
    .then((answers) => {
      const newData = data.filter((record) => record.id !== answers.id);
      if (newData.length !== data.length) {
        saveData(newData);
        console.log(chalk.green("Record deleted successfullY"));
      } else {
        console.log(chalk.red("Record not found !"));
      }
      mainMenu();
    });
}
mainMenu();
