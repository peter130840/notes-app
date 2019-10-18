const chalk = require('chalk');
const fs = require('fs');

const readNotes = (title) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => {
        return note.title === title
    });
    if(duplicateNote)
    {
        console.log(chalk.bgGreen(duplicateNote.title));
        console.log(duplicateNote.body);
    }
    else{console.log(chalk.bgRed(`can't find ${title}`))};
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log('New note added!');
    } else {
        console.log('Note title taken!');
    }
    

}

const saveNotes = (notes) =>{
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () =>{
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(error) {
        return [];
    }
}

const removeNote = (noteTitle) => {
    const existingNote = loadNotes();
    const newNote = existingNote.filter((note) => note.title !== noteTitle);
    if(existingNote.length === newNote.length){
        console.log(chalk.bgGreen(`can't find ${noteTitle}`));
    }
    else{
        console.log(chalk.bgRed(noteTitle + ' deleted!'));
        saveNotes(newNote);
    }
}

const listNotes = () =>{
    const existingNote = loadNotes();
    console.log(chalk.bgGreen('Your notes :'));
    existingNote.forEach((note) =>{
        console.log(note.title);
    })
};


module.exports = {
    readNotes: readNotes, 
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
}