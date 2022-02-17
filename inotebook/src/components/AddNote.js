import React, { useContext, useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import Notes from "./Notes";
import noteContext from "../context/notes/noteContext.js";

const AddNote = () => {
  const { addNote } = useContext(noteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  };
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Form>
        <Form.Group className="mt-5">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter note title"
            id="title"
            name="title"
            value={note.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            id="description"
            name="description"
            value={note.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>tag</Form.Label>
          <Form.Control
            type="text"
            placeholder="tag"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={handleChange}
          />
        </Form.Group>
        <Button
          disabled={note.title.length < 3 || note.description.length < 6}
          className="mt-3"
          onClick={handleSubmit}
        >
          Add Note
        </Button>
      </Form>
      <Notes />
    </Container>
  );
};

export default AddNote;
