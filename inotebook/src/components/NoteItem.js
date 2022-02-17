import React, {useContext} from "react";
import { Card } from "react-bootstrap";
import noteContext from "../context/notes/noteContext.js";

const NoteItem = (props) => {
  const { note, updateNote } = props;
  const { deleteNote } = useContext(noteContext);
  
  return (
    <div className="col-md-3">
      <Card className="my-3">
        <Card.Body>
          <Card.Title>{note.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{note.tag}</Card.Subtitle>
          <Card.Text>{note.description}</Card.Text>
          <i className="fas fa-edit mx-2" onClick={() => {updateNote(note)}}/>
          <i className="fas fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}/>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NoteItem;
