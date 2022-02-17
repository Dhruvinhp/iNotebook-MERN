import React, { useContext, useEffect, useState, useRef } from "react";
import noteContext from "../context/notes/noteContext.js";
import NoteItem from "./NoteItem.js";
import { Container, Modal, Button, Form } from "react-bootstrap";

const Notes = () => {
  const { notes, fetchNotes, editNote } = useContext(noteContext);
  const [show, setShow] = useState(false);
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    handleClose()
  };

  useEffect(() => {
    fetchNotes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const ref = useRef(null);
  const updateNote = (note) => {
    ref.current.click();
    setNote({id:note._id,etitle:note.title, edescription:note.description, etag:note.tag});
  };

  return (
    <Container>
      <Button
        className="d-none"
        variant="primary"
        ref={ref}
        onClick={handleShow}
      >
        Launch demo modal
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter note title"
                id="etitle"
                name="etitle"
                value={note.etitle}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                id="edescription"
                name="edescription"
                value={note.edescription}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>tag</Form.Label>
              <Form.Control
                type="text"
                placeholder="tag"
                id="etag"
                name="etag"
                value={note.etag}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button disabled={note.etitle.length < 3 || note.edescription.length < 6} variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <h3 style={{ textAlign: "center" }} className="mt-3">
        My Notes
      </h3>
      <div className="mx-3 row my-4">
        {notes.length === 0 && <h4 className="text-muted" style={{ textAlign: "center"}}>"No notes to display!"</h4>}
        {notes &&
          notes.map((note) => {
            return (
              <NoteItem key={note._id} note={note} updateNote={updateNote} />
            );
          })}
      </div>
    </Container>
  );
};

export default Notes;
