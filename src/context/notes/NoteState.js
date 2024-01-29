import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const s1 = {
    "name": "Usama",
    "class": "14B"
  };
 const [state, setState] = useState(s1)

 const update =()=>{
    setTimeout(() => {
        setState({
            "name": "Jawaid",
            "class": "11B"
        })
    }, 3000);
 }
  return (
    <NoteContext.Provider value={{state, update}}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
