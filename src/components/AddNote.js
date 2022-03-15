import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';


const AddNote = () => {
    const context = useContext(noteContext)
    const {addNote } = context;
    const [note, setNote] = useState({title: "", description: "", tag: "",})

    const handleClick=(e)=>{
        e.preventDefault() //taki page reload na ho jabardasti
        addNote(note.title, note.description, note.tag) //addnote function ko title description and tag denge
        setNote({title: "", description: "", tag: ""}) //agar ek baar setnote kar diya to fir wo same chiz ko baar baar add karne ka option nai hona chahiye isiliye empty kardo
    }

    const onChange=(e)=>{
        setNote({...note, [e.target.name]:e.target.value})  //jo bhi value is note ke andar hai wo rahe par jo bhi yaha likhe jaa rahe hai unhe add ya override kardo
    }
    return (
        <div>
            <div className="container my-3">
                <h1>Add a note</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title"  placeholder="title" name="title" value={note.title} onChange={onChange} minLength={3} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" id="description" name = "description" value={note.description} placeholder="description" onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag">Tag</label>
                        <input type="text" className="form-control" id="tag" name = "tag" value={note.tag} placeholder="tag" onChange={onChange} />
                    </div>
                    <button disabled={note.title.length<3 || note.description.length<5 }type="submit" className="btn btn-primary my-4" onClick={handleClick}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote