import jsonData from "./data"
import './App.css'
import Comment from "./components/Comment";
import { useEffect, useState } from "react";
import { AllType } from "./types";
import MakeComment from "./components/MakeComment";
import DeleteWarning from "./components/DeleteWarning";
import ChangeUser from "./components/ChangeUser";


function App() {
  // localStorage.setItem("data", JSON.stringify(jsonData));
  const lsData = localStorage.getItem("data")
  const [data, setData]: [AllType, React.Dispatch<React.SetStateAction<any>>] = useState(typeof lsData === "string" ? JSON.parse(lsData) : jsonData);

  const [showWarning, setShowWarning] = useState(null as null | JSX.Element)
  const [showChange, setShowChange] = useState(false as boolean)

  useEffect(() => {
    const sortComs = [...data.comments].sort((a, b) => {
      const aScore = a.score.length - a.downvotes.length;
      const bScore = b.score.length - b.downvotes.length;
      return bScore - aScore
    })

    setData((prev: AllType) => {
      prev.comments = sortComs
      return prev
    })

  }, [])

  const commEls = data.comments.map(comment => (
    <Comment comment={comment} data={data} setData={setData} key={comment.id} parent={comment} toggleWarning={toggleWarning} />
  ));


  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data])


  function toggleWarning(func : null | Function){
    if (func) {
      setShowWarning(<DeleteWarning dFunc={func} toggleWarning={toggleWarning} />)
    } else {
      setShowWarning(null)
    }
  }

  const changeEl = <ChangeUser data={data} toggleChange={toggleChange} setData={setData} />

  function toggleChange(on : boolean) {
    if (on) {
      setShowChange(false)
    } else {
      setShowChange(true)
    }
  }

  if (showChange || showWarning){
    document.body.classList.add("overflow-y-hidden")
  } else {
    document.body.classList.remove("overflow-y-hidden")

  }
  
  return (
    <>
      {showWarning}
      {showChange && changeEl}
      <div className={`w-full md:w-7/12 md:min-w-[700px] mx-auto my-16 flex flex-col gap-6`}>

        <button onClick={() => toggleChange(false)}
        className="border text-neutral-dark-blue border-primary-moderate-blue self-start px-2 py-1.5 text-sm rounded-lg hover:scale-105 transition-transform duration-75 ease-linear">Change User</button>

        {commEls}

        <MakeComment data={data} setData={setData} setShow={null} parent={null} replyTo={null} />
      </div>
    </>
  )
}

export default App
