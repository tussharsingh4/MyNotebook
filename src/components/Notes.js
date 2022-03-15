import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from "../context/notes/noteContext"
import AddNote from './AddNote'
import Noteitem from "./Noteitem"

const Notes = (props) => {
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context;

    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            navigate("/login")
        }
         //sare notes ko fetch karlo and ye bas ek baar karna hai
        //eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "", })



    const updateNote = (currentNote) => { //ye function note lega update karne ke liye
        ref.current.click();
        setNote({ id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag }) //title description and tag ab change ho jaenge
    }

    const handleClick = (e) => {

        e.preventDefault() //taki page reload na ho jabardasti
        editNote(note.id, note.etitle, note.description, note.etag) //edit note me ye values pass kar diye
        refClose.current.click()
        //props.showAlert("Updated Successfully", "success")
        //addNote(note.title, note.description, note.tag) //addnote function ko title description and tag denge
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })  //jo bhi value is note ke andar hai wo rahe par jo bhi yaha likhe jaa rahe hai unhe add ya override kardo
    }

    return (
        <>
            <AddNote  showAlert ={props.showAlert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5}  />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>You Notes</h2>
                <div className="container mx-2">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
//useref kisi bhi ek element ko reference de sakte ho
//agar notes me kuch nai