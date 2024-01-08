const express = require("express");
const router = express.Router();
const fetchuser = require("../midlewere/fetchuser");  
const Notes = require("../Models/Notes");

router.get("/fetchallnotes", fetchuser, async (req, res) => {  
  try {
    const notes = await Notes.find({ user: req.user.id });  
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
