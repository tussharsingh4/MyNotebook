import React from 'react'
import Notes from './Notes'


const Home = (props) => { //yaha props dene se define kar paegene
    const showAlert = props

    return (
        <div>
            <Notes showAlert={showAlert} />
        </div>
    )
}

export default Home