const chalk = require('chalk');
const yargs = require('yargs');
const notesUtil = require('./note.js');


yargs.version('1.1.0');

yargs.command({
    command: ['add', 'a'],
    describe: 'add a new note',
    builder:{
        title: {
            alias: 't',
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            alias: 'b',
            describe:'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        //console.log('adding a new note!' , argv)
        //console.log('Title: ' + argv.title);
        //console.log('body: '  + argv.body);
        notesUtil.addNote(argv.title, argv.body);
        
    }
});

yargs.command({
    command: ['remove','r'],
    describe: 'removing a existing note',
    builder:{
        title: {
            alias: 't',
            describe: 'Remove note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesUtil.removeNote(argv.title);
        //console.log('removing note '+ argv.title +'!');
    }
});

yargs.command({
    command: ['list','l'],
    describe: 'list note',
    handler() {
        notesUtil.listNotes();
    }
});

yargs.command({
    command: ['read','g'],
    describe: 'read note',
    builder:{
        title: {
            alias: 't',
            describe: 'Read note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesUtil.readNotes(argv.title);
    }
});

yargs.parse();
//console.log(process.argv);
//console.log(yargs.argv);
