import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";

const pathofdata = "./data.json";

function loadData() {
  try {
    const data = fs.readFileSync(pathofdata);
    return JSON.parse(data.toString());
  } catch (e) {
    return [];
  }
}

function saveData(data) {
  fs.writeFileSync(pathofdata, JSON.stringify(data));
}

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "action",
        message: "what do you want to do ? : ",
        choices: ["Creat", "Read", "Update", "Delete", "Exit"],
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
        message: "Enter the name of the record : ",
      },

      {
        type: "input",
        name: "age",
        message: "Enter the age of the record : ",
      },
    ])
    .then((answers) => {
      const data = loadData();
      data.push({ id: Date.now().toString(), ...answers });
      saveData(data);
      console.log(chalk.green("data saved successfully"));
      mainMenu();
    });
}

function readRecord() {
  const data = loadData();
  console.log(chalk.yellow("the records : "));
  data.forEach((record) => {
    console.log(
      `the id : ${record.id} , the name : ${record.name} and the age is ${record.age}`
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
        message: "Enter the id of the record to update : ",
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
      const data = loadData();
      const index = data.findIndex((record) => record.id === answers.id);
      if (index !== -1) {
        data[index] = { id: answers.id, name: answers.name, age: answers.age };
        saveData(data);
        console.log(chalk.green("data is updated successfully !"));
      } else {
        console.log(chalk.red("the id is not found !"));
      }
      mainMenu();
    });
}

function deleteRecord() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "Enter the id of the record to delete : ",
      },
    ])
    .then((answers) => {
      const data = loadData();
      const newData = data.filter((record) => record.id !== answers.id);
      if (data.length !== newData.length) {
        saveData(newData);
        console.log(chalk.green("data is updated successfully !"));
      } else {
        console.log(chalk.red("the data is not updated  successfully !"));
      }
      mainMenu();
    });
}

mainMenu();
