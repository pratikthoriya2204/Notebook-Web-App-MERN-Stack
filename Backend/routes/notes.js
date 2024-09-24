const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');

// Route 1 :- create a user using : POST "api/notes/fetchallnotes". .....................
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Inetrnal server error..");
    }
});

// Route 2 :- Add a Notes using : POST "api/notes/addnote". .....................
router.post('/addnote', fetchuser, [

    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'enter a valid description').isLength({ min: 5 }),
], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;

        const note = new Note({
            title, description, tag, user: req.user.id
        });

        const savedNotes = await note.save();

        res.json(savedNotes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Inetrnal server error..");
    }
});

// Route 3 :- Update Notes using : PUT "api/notes/updatenote". .....................
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {

        const { title, description, tag } = req.body;

        //create a newNote Object.....
        const newNote = {};

        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find the note id ...
        let note = await Note.findById(req.params.id);
        //check note existence...
        if (!note) { return res.status(404).send("Not Found") }

        //check loged user id updation...
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Note Allowed")
        }

        //Update Note Query..
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Inetrnal server error..");
    }
});

// Route 4 :- Delete Notes using : DELETE "api/notes/deletenote". .....................
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {

        const { title, description, tag } = req.body;

        //create a newNote Object.....
        const newNote = {};

        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find the note to be delete and deleted ...
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }


        //Allowed deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Note Allowed")
        }

        //Update Note Query..
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success":"Note has been deleted" ,note:note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Inetrnal server error..");
    }
});

module.exports = router;