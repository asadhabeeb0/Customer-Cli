#!/usr/bin/env node
const program = require('commander');
const readline = require('readline');

const { addClient, findClient, updateClient, removeClient, listClients } = require('./index');

const questions = [
    {
        type: 'input',
        name: 'firstname',
        message: 'Client First Name'
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'Client Last Name'
    },
    {
        type: 'input',
        name: 'phone',
        message: 'Client Phone Number'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Client Email Address'
    }
]

program
    .version('1.0.0')
    .description('Client management CLI')


program
    .command('add')
    .alias("a")
    .description("Add a Client")
    .action(() => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const clientData = {};

        const collectData = (questionIndex) => {
            if (questionIndex < questions.length) {
                const question = questions[questionIndex];
                rl.question(question.message + ': ', (answer) => {
                    clientData[question.name] = answer;
                    collectData(questionIndex + 1);
                });
            } else {
                addClient(clientData);
                rl.close();
            }
        };

        collectData(0);
    });

program
    .command('find <name>')
    .alias('f')
    .description('Find a client by name')
    .action((name) => {
        findClient(name);
    });

program
    .command('update <id>')
    .alias('u')
    .description('Update a client')
    .action((_id) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const updatedClientData = {};

        const collectData = (questionIndex) => {
            if (questionIndex < questions.length) {
                const question = questions[questionIndex];
                rl.question(question.message + ': ', (answer) => {
                    updatedClientData[question.name] = answer;
                    collectData(questionIndex + 1);
                });
            } else {
                updateClient(_id, updatedClientData);
                rl.close();
            }
        };
        collectData(0);
    });

program
    .command('remove <id>')
    .alias('r')
    .description('Remove a Client')
    .action((_id) => {
        removeClient(_id);
    });

program
    .command('list')
    .alias('l')
    .description('List all Clients')
    .action(() => {
        listClients();
    });


program.parse(process.argv);