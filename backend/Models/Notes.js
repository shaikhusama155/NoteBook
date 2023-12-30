const mongoose = require("mongoose");

const NotesSchema = new Schema({
  name: {
    title: string,
    required: true,
  },
  descrition: {
    type: srting,
    required: true,
    unique: true,
  },
  tag:{
    type: string,
    default:"General"
  },
  date:{
    type: date,
    default: Date.now,
  }
});


module.exports= mongoose.Model("user",NotesSchema )