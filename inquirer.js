#! /usr/bin/env node  自定义交互内容
'use strict';
const inquirer = require('inquirer');
var chalkPipe = require('chalk-pipe');

function list() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'theme',
      message: 'What do you want to do?',
      choices: [
        'Order a pizza',
        'Make a reservation',
        new inquirer.Separator(),
        'Ask for opening hours',
        {
          name: 'Contact support',
          disabled: 'Unavailable at this time'
        },
        'Talk to the receptionist'
      ]
    },
    {
      type: 'list',
      name: 'size',
      message: 'What size do you need?',
      choices: ['Jumbo', 'Large', 'Standard', 'Medium', 'Small', 'Micro'],
      filter: function(val) {
        return val.toLowerCase();
      }
    }
  ])
  .then(answers => {
    console.log(JSON.stringify(answers, null, '  '));
  })
}

function longList() {
  var choices = Array.apply(0, new Array(26)).map((x, y) => String.fromCharCode(y + 65));
  choices.push('Multiline option \n  super cool feature');
  choices.push({
    name:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.',
    value: 'foo',
    short: 'The long option'
  });
  
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'letter',
        message: "What's your favorite letter?",
        choices: choices
      },
      {
        type: 'checkbox',
        name: 'name',
        message: 'Select the letter contained in your name:',
        choices: choices
      }
    ])
    .then(answers => {
      console.log(JSON.stringify(answers, null, '  '));
    });
}


function inputBugIndex(callback) {
  var questions = [
    {
      type: 'input',
      name: 'index',
      message: "请输入您要解决的 BUG 或 FEATURE 序号 :",
      validate: function(value) {
        var pass = value.match(
          /^-?[1-9]\d*$/i
        );
        if (pass) {
          return true;
        }
        return '请输入正确的序号数字 ！';
      }
    }
  ];
  
  inquirer.prompt(questions).then(answers => {
    console.log(JSON.stringify(answers, null, '  '));
    callback(answers.index);
  });
}

module.exports  =  {
    list : list,
    inputBugIndex : inputBugIndex,
    longList : longList
}
