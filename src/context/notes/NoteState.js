import React from "react";
import NoteContext from "./noteContext";


const NoteState = (props) =>{
    const state = {
        "name": "Usama",
        "class": "14B"
    }
    return(
        <NoteContext.Provider value={state}>
            {props.chlidren}
        </NoteContext.Provider>
    )
}

export default NoteState;