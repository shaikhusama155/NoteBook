import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Home = () => {
  const a = useContext(noteContext)
  return (
  <div>
    This is Home {a.name}
    </div>
    )
};

export default Home;
