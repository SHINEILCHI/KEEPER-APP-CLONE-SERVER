const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: false
    }
});

const NoteModel = mongoose.model("notes", NotesSchema);
module.exports = NoteModel