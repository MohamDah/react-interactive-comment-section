import data from "./data.json"
import './App.css'
import Comment from "./components/Comment";

function App() {
  



  const commEls = data.comments.map(comment => (
    <Comment comment={comment} currentUser={data.currentUser} key={comment.id} />
  ));

  return (
    <>
      <div className='w-7/12 mx-auto mt-16 flex flex-col gap-6'>

        {commEls}

        <div className="bg-neutral-white p-7 flex gap-6 rounded-lg items-start w-full">
          <img src={`src/${data.currentUser.image.png}`} alt=""
            className="h-12" />
          <textarea name="comment" id="comment"
            className="border rounded-lg flex-grow resize-none h-32 px-6 py-3 text-lg focus:outline-none" placeholder="Add a comment..."></textarea>
          <button className="bg-primary-moderate-blue text-neutral-white w-28 h-12 rounded-lg text-lg font-medium">SEND</button>
        </div>
      </div>
    </>
  )
}

export default App
