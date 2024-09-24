import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom';


export default function Notes(props) {
  let navigate = useNavigate();
  const context = useContext(noteContext)
  const { notes, getNote, editNote } = context;

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNote();
    }else{
      navigate('/login');
    }
     // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);


  const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });

  const upadateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }
  const handleEditClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showALert("Data Edit Successfully...","success");

    // addNote(note.title,note.description,note.tag);
  }

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <AddNotes showALert={props.showALert} />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Now</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onchange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleEditClick}>Update Now</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="row my-3 ">
          <h1>Your Notes</h1>
          <div className="container">
            {notes.length === 0 && "No Notes to display..."}
          </div>
          {notes.map((note) => {
            return <NoteItem key={note._id} upadateNote={upadateNote} showALert={props.showALert} note={note} />
          })}
        </div>
      </div>
    </>
  )

}
