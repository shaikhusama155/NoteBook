const express = require("express");
const router = express.Router();
const fetchuser = require("../midlewere/fetchuser");
const Note = require("../Models/Note");
const { body, validationResult } = require("express-validator");

// Get all notes (login required)
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Add a new note (login required)
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // Create a new note
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      // Save the note to the database
      const noteSave = await note.save();
      res.json(noteSave);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//update a note loggined user /updatenote
router.put("/updatenote/:id", fetchuser, async (req, res) => {
const {title, description, tag} = req.body;
//create a new object
const newNote ={};
if(title){newNote.title = title};
if(description){newNote.description = description};
if(tag){newNote.tag = tag};
//find the for updated it update
let note = await Note.findById(req.params.id);
if(!note){return res.status(404).send("Not Found")};

if(note.user.toString() !== req.user.id){
  return res.status(401).send("Not Allowed");
}
note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
res.json({note});

});

module.exports = router;
