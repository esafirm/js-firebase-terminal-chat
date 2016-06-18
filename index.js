#!/usr/bin/env node
'use strict';
var inquirer = require('inquirer');
var chalk = require('chalk');
var firebase = require('firebase');
// Firebase
firebase.initializeApp({
    serviceAccount: "./firebase.json",
    databaseURL: "https://fireterminal.firebaseio.com/"
});
// Say Hello!
console.log(chalk.yellow('[*] FireTerminal [*]'));
var db = firebase.database();
var questions = [
    {
        message: 'Enter your name',
        type: 'input',
        name: 'name'
    },
    {
        type: 'input',
        message: 'Enter channel name',
        name: 'channel'
    }
];
var chatPrompt = {
    message: '~>',
    type: 'input',
    name: 'val'
};
inquirer.prompt(questions).then(function (answer) {
    console.log(chalk.red('\n------------------------'));
    console.log(chalk.yellow('[*] OK GOT IT! [*]'));
    console.log(chalk.red('------------------------\n'));
    initChat(answer);
});
function initChat(params) {
    var ref = db.ref("chat/" + params.channel);
    ref.on("child_added", function (snapshot) {
        var val = snapshot.val();
        if (val && val.name !== params.name) {
            clearCurrentLine();
            console.log(chalk.yellow(val.name)
                + " : "
                + val.value);
        }
    });
    initChatPrompt(ref, params);
}
function initChatPrompt(ref, params) {
    inquirer.prompt(chatPrompt).then(function (answer) {
        var val = answer.val;
        ref.push().set({
            name: params.name,
            value: val
        });
        initChatPrompt(ref, params);
    });
}
function clearCurrentLine() {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
}
