#!/usr/bin/env node

'use strict'

import * as inquirer from 'inquirer'
import * as chalk from 'chalk'
import * as firebase from 'firebase'
import * as rl from 'readline'

// Firebase
firebase.initializeApp({
  serviceAccount: "./firebase.json",
  databaseURL: "https://fireterminal.firebaseio.com/"
});

// Say Hello!
console.log(chalk.yellow('[*] FireTerminal [*]'));

interface Answer {
  name: string,
  channel: string
}

const db = firebase.database();
const questions: inquirer.Question[] = [
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

const chatPrompt: inquirer.Questions = {
  message: '~>',
  type: 'input',
  name: 'val'
}

inquirer.prompt(questions).then((answer: Answer) => {
  console.log(chalk.red('\n------------------------'));
  console.log(chalk.yellow('[*] OK GOT IT! [*]'));
  console.log(chalk.red('------------------------\n'));
  initChat(answer);
});

function initChat(params: Answer) {
  const ref = db.ref("chat/" + params.channel);
  ref.on("child_added", function (snapshot) {

    const val = snapshot.val();
    if (val && val.name !== params.name) {
      clearCurrentLine();
      console.log(
        chalk.yellow(val.name)
        + " : "
        + val.value
      )
    }
  });

  initChatPrompt(ref, params);
}

function initChatPrompt(ref: any, params: Answer) {
  inquirer.prompt(chatPrompt).then((answer) => {

    const val = answer.val;
    ref.push().set({
      name: params.name,
      value: val
    });

    initChatPrompt(ref, params)
  })
}

function clearCurrentLine() {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
}
