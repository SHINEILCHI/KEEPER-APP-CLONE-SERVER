require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const NoteModel = require("./models/Notes");
const cors = require("cors");

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));

mongoose.connect(process.env.MONGODB_URI);

app.get("/read", (req, res) => {
    NoteModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
});

app.post("/createNote", async (req, res) => {
    const note = req.body;
    const newNote = new NoteModel(note);
    await newNote.save();
    res.json(note)
});

app.delete("/deleteNote", async (req, res) => {
    const id = req.query;
    NoteModel.deleteOne({_id: id}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5500;
}

app.listen(port, () => {
    console.log("Server is running at port: 5500");
})