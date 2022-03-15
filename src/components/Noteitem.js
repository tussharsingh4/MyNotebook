import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash-can mx-4" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully", "success") }}></i>
                        <i className="mx-4 fa-solid fa-pen-to-square" onClick={() => { updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
//delete icon me onclick se handle dete karenge
//yaha  pe note bheja hai update ke liye