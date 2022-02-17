import React, { useState } from "react";
import noteContext from "./noteContext";
import axios from "axios";

const NoteState = (props) => {
  const noteinitial = [];
  const [notes, setNotes] = useState(noteinitial);

  // Get Notes from the api
  const fetchNotes = async () => {
    await axios
      .get(`${process.env.REACT_APP_HOST_NAME}/api/notes/fetchnotes`, {
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwYTRkOGViM2NkMTk2M2QyMTAzZTdlIn0sImlhdCI6MTY0NDk5MzI2MH0.JMILUTdtupWAY5iFiZ2dsmN6Zf1KeqYr-mLL0bJwY8M",
        },
      })
      .then((response) => {
        setNotes(response.data);
      });
  };

  // Add Notes with api
  const addNote = async (title, description, tag) => {
    const data = { title, description, tag };
    await axios
      .post(`${process.env.REACT_APP_HOST_NAME}/api/notes/addnotes/`, data, {
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwYTRkOGViM2NkMTk2M2QyMTAzZTdlIn0sImlhdCI6MTY0NDk5MzI2MH0.JMILUTdtupWAY5iFiZ2dsmN6Zf1KeqYr-mLL0bJwY8M",
        },
      })
      .then((response) => {
        console.log("Add note: ", response.data);
        fetchNotes();
      });
  };

  // Edit Notes with api
  const editNote = async (id, title, description, tag) => {
    const data = { title, description, tag };
    await axios
      .patch(`${process.env.REACT_APP_HOST_NAME}/api/notes/updatenote/${id}`, data, {
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwYTRkOGViM2NkMTk2M2QyMTAzZTdlIn0sImlhdCI6MTY0NDk5MzI2MH0.JMILUTdtupWAY5iFiZ2dsmN6Zf1KeqYr-mLL0bJwY8M",
        },
      })
      .then((response) => {
        console.log("edit notes: ", response.data);
        fetchNotes();
      });

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element.id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  // Delete Notes with api
  const deleteNote = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_HOST_NAME}/api/notes/deletenote/${id}`, {
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwYTRkOGViM2NkMTk2M2QyMTAzZTdlIn0sImlhdCI6MTY0NDk5MzI2MH0.JMILUTdtupWAY5iFiZ2dsmN6Zf1KeqYr-mLL0bJwY8M",
        },
      })
      .then((response) => {
        console.log("Delete note: ", response.data);
        fetchNotes();
      });
  };

  return (
    <noteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, fetchNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
