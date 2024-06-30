import fs from "fs";
import inquirer from "inquirer";
import chalk from "chalk";

const pathofdata = "./data.json";

function loadData() {
  try {
    const datab = fs.readFileSync(pathofdata);
    const dat = JSON.parse(datab.toString());
    return dat;
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
        choices: ["Create", "Delete", "Read", "Update", "Exit"],
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
        message: "what is your name ? : ",
      },

      {
        type: "input",
        name: "age",
        message: "what is your age ? :  ",
      },
    ])
    .then((answers) => {
      const data = loadData();
      data.push({ id: Date.now().toString(), ...answers });
      saveData(data);
      console.log(chalk.green("data reached the file successful ! "));
      mainMenu();
    });
}

function readRecord() {
  const data = loadData();
  console.log(chalk.yellow("the records are : "));
  data.forEach((record) => {
    console.log(`id: ${record.id} , name: ${record.name} ,age: ${record.age}`);
  });
  mainMenu();
}

function deleteRecord() {
  const data = loadData();
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "what is the id of the record you want to delete ? : ",
      },

      {
        type: "input",
        name: "name",
        message: "what is the name of the record you want to delete ? : ",
      },
    ])
    .then((answers) => {
      const data = loadData();
      const newData = data.filter((record) => record.id !== answers.id);
      if (data.length !== newData.length) {
        saveData(newData);
        console.log(chalk.green("data reached the file successfully !"));
      } else {
        console.log(chalk.red("data didnot reached the file successfully !"));
      }
      mainMenu();
    });
}

function updateRecord() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "what is the id of the record you want to update ? : ",
      },
      {
        type: "input",
        name: "name",
        message: "what is the new name ? : ",
      },
      {
        type: "input",
        name: "age",
        message: "what is the new age ? : ",
      },
    ])
    .then((answers) => {
      const data = loadData();
      const index = data.findIndex((record) => record.id === answers.id);
      if (index !== -1) {
        data[index] = { id: answers.id, name: answers.name, age: answers.age };
        saveData(data);
        console.log(chalk.green("data is updated successfully ! "));
      } else {
        console.log("data is not stored successfully !");
      }
      mainMenu();
    });
}
mainMenu();
