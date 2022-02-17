const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

// Get notes Details: GET "/api/notes/fetchnotes" login required
router.get("/fetchnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add new notes: POST "/api/notes/addnotes" login required
router.post(
  "/addnotes",
  [
    body("title", "Title should be atleast 3 character").isLength({ min: 3 }),
    body("description", "Password must be atleast 6 character").isLength({
      min: 6,
    }),
  ],
  fetchUser,
  async (req, res) => {
    try {
      // if there are any errors, return the bad request with the error message
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // const { title, description, tag } = req.body;
      // const note = new Note({
      //   title,
      //   description,
      //   tag,
      //   user: req.user.id,
      // });

      // const saved = await note.save();
      // res.json({ saved });

      note = await Note.create({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        user: req.user.id,
      })
        .then((note) => res.json(note))
        .catch((err) =>
          res.status(500).send("something went wrong user not created!")
        );
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Update note: POST "/api/notes/updatenote/id" login required
router.patch("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newnote = {}
    if(title){newnote.title = title}
    if(description){newnote.description = description}
    if(tag){newnote.tag = tag}

    // find the note and update the note
    let note = await Note.findById(req.params.id)
    if(!note){return res.status(404).send("404 Not Found")}
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Unauthorized")
    }
    note = await Note.findByIdAndUpdate(req.params.id, {$set: newnote}, {new:true}) 
    res.json({ note });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete note: DELETE "/api/notes/deletenote/id" login required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    // find the note and delete the note
    let note = await Note.findById(req.params.id)
    if(!note){return res.status(404).send("Not Found")}
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Unauthorized")
    }
    note = await Note.findByIdAndDelete(req.params.id) 
    res.json({ message: "Note successfully deleted!" });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
