#! /usr/bin/env node
import inquirer from "inquirer";
let myBalance = 10000; // Dollar
const myPin = 1234;
const pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: "Enter your pin",
        type: "number"
    }
]);
if (pinAnswer.pin === myPin) {
    console.log("Correct pin code!!!");
    const operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: "Please select an option",
            type: "list",
            choices: ["withdraw", "check balance", "fast cash"]
        }
    ]);
    if (operationAns.operation === "withdraw") {
        const amountAns = await inquirer.prompt([
            {
                name: "amount",
                message: "Enter the amount to withdraw",
                type: "number"
            }
        ]);
        if (amountAns.amount > myBalance) {
            console.log("Sorry, you don't have enough balance.");
        }
        else {
            myBalance -= amountAns.amount;
            console.log(`Your remaining balance is ${myBalance}`);
        }
    }
    else if (operationAns.operation === "check balance") {
        console.log(`Your current balance is ${myBalance}`);
    }
    else if (operationAns.operation === "fast cash") {
        const fastCashOptions = [100, 500, 1000, 5000];
        const fastCashChoice = await inquirer.prompt([
            {
                name: "amount",
                message: "Select a fast cash option",
                type: "list",
                choices: fastCashOptions.map(amount => ({
                    name: `$${amount}`,
                    value: amount
                }))
            }
        ]);
        const amountToWithdraw = fastCashChoice.amount;
        if (amountToWithdraw > myBalance) {
            console.log("Sorry, you don't have enough balance.");
        }
        else {
            myBalance -= amountToWithdraw;
            console.log(`Fast cash of $${amountToWithdraw} withdrawn successfully.`);
            console.log(`Your remaining balance is ${myBalance}`);
        }
    }
}
else {
    console.log("Incorrect Pin Code");
}
