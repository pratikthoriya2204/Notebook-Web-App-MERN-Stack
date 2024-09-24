import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';


export default function NoteItem(props) {
    const context = useContext(noteContext)
    const { deleteNote } = context;

    const { note, upadateNote } = props;


    const handleDelete = () => {
        deleteNote(note._id);
        props.showALert("Deleted Successfully...", "success")
    }
    return (
        <div className='col-md-4'>
            <div className="card my-3 ">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash-can mx-2" onClick={handleDelete}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { upadateNote(note) }}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>

                </div>
            </div>
        </div>
    )
}
