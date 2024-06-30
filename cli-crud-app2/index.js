import fs from "fs";
import inquirer from "inquirer";
import chalk from "chalk";

const pathofdata = "./data.json";

function loadData() {
  try {
	const data = fs.readFileSync();
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
		choices: ["Create", "Delete", "Read", "Update","Exit"],
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
			break		
	  }
	});
}

function createRecord()
