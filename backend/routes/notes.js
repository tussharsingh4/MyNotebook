const express = require('express')
const fetchUser = require('../middleware/fetchUser')
const router = express.Router()
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');

//route-1 get all the notes
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server error")
    }


})

//route-2 add new notes using post /api/auth/addnote
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid name').isLength({ min: 3 }),
    body('description', 'Password must be atleast 5 characters').isLength({ min: 5 }), //idhar bhi validation karenge ab
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server error")
    }


})

//Route 3 update an existing note put /api/auth/updatenotes
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body
    //create new note here
    try {
        const newNote = {}
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    // Check karna hai ki user to sahi haina and ek hi user hai koi dusra user nai
    //Find the note to be updated

    let note = await Note.findById(req.params.id)
    if (!note) { return res.status(400).send("Not found") }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({note})
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server error")
    }

})

//Route 4 delete an existing note
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body
    //no need to create a new node object

    // Check karna hai ki user to sahi haina and ek hi user hai koi dusra user nai
    //Find the note to be deleted
    try {
    let note = await Note.findById(req.params.id)
    if (!note) { return res.status(400).send("Not found") }
    // allow delete tabhi jab user own karta hai
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note has been deleted"})
    } catch (error){
        console.log(error.message)
        res.status(500).send("Internal Server error")
    }
})

module.exports = router