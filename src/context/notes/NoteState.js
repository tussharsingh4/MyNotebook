import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)
    //get all note
    const getNotes = async () => {   ///ye teeno chahiye note add karne ke liye. baki saru chize apne aap add hongi
        // TODO: APi call
        //API call and is function ko Notes.js me call kia hai
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),

                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // idhar body dene ka jaroorat nai
        });
        const json = await response.json();
        setNotes(json)
    }

    //Add a note
    const addNote = async (title, description, tag) => {   ///ye teeno chahiye note add karne ke liye. baki saru chize apne aap add hongi
        // TODO: APi call
        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),

                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ title, description, tag }) //ye data hai jo api se laga rahe hai
        });

        const note = await response.json();
        setNotes(notes.concat(note))
        //yaha pe notes ko push kar rahe hai. yaha notes. concat use kia cz notes.concat naya array return karega idhar
    }


    //delete a note
    const deleteNote = async (id) => { //ye delete function notes me delete icon me load hoga
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),

                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const json = response.json();
        console.log("Deleted the note with id" + id) //yaha pe id pass karke delete id diya hai
        const newNotes = notes.filter((note) => { return note._id !== id }) //agar note_ nai hai barabar id ke to wo rahega nai to nai rahega
        setNotes(newNotes)
    }


    //edit a note
    const editNote = async (id, title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),

                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);

        //logic to edit in client
        let newNotes = JSON.parse(JSON.stringify(notes)) //ye karne se yaha iski deep copy ban jaegi
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
            //ab changes ke baad break karke nikalna hai
        }
        setNotes(notes)
    }



    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
//function bana ki jo  bhi provide karna hai usko value me dal do  and context.provider karke likho taki sare children aajae uske andar