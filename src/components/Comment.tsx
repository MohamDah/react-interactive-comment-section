import { Fragment } from "react/jsx-runtime";

import { CommentType, Reply, AllType } from "../types";
import MakeComment from "./MakeComment";
import { useState } from "react";
import EditComment from "./EditComment";


export default function Comment({ comment, data, setData, parent, toggleWarning }: {
    comment: CommentType | Reply,
    data: AllType,
    setData: React.Dispatch<React.SetStateAction<any>>,
    parent: CommentType,
    toggleWarning: any
}) {
    let replies: JSX.Element[] = [];
    if ("replies" in comment && comment.replies.length > 0) {
        replies = comment.replies.map(reply => <Comment comment={reply} key={reply.id} data={data} setData={setData} parent={comment} toggleWarning={toggleWarning} />)
    }


    function handleDelete() {
        let arr: CommentType[] = [...data.comments];

        arr = arr.filter(i => i.id !== comment.id);
        arr = arr.map(i => {
            i.replies = i.replies.filter(j => j.id !== comment.id)
            return i
        })
        setData((prev: AllType) => ({
            ...prev,
            comments: arr
        }))
    }


    const [show, setShow]: [boolean, React.Dispatch<React.SetStateAction<any>>] = useState(false)
    const commentEl = <MakeComment replyTo={comment} parent={parent} data={data} setData={setData} setShow={setShow} />;
    const [edit, setEdit]: [boolean, React.Dispatch<React.SetStateAction<any>>] = useState(false)
    const editEl = <EditComment comment={comment} setData={setData} setEdit={setEdit} />
    function handleReply() {
        setShow((prev: boolean) => !prev)
    }
    function handleEdit() {
        setEdit((prev: boolean) => !prev)
    }





    function showTime() {
        let seconds = (new Date().getTime() - +comment.createdAt) / 1000;
        seconds = Math.floor(seconds);

        if (seconds < 60) {
            return "few seconds ago"
        }

        if (seconds < 3600) {
            const mins = Math.floor(seconds / 60)
            return mins + (mins === 1 ? " minute ago" : " minutes ago")
        }

        if (seconds < 3600 * 24) {
            const hours = Math.floor(seconds / 3600)
            return hours + (hours === 1 ? " hour ago" : " hours ago")
        }

        if (seconds < 3600 * 24 * 7) {
            const days = Math.floor(seconds / (3600 * 24))
            return days + (days === 1 ? " day ago" : " days ago")
        }

        if (seconds < 3600 * 24 * 7 * 4) {
            const weeks = Math.floor(seconds / (3600 * 24 * 7))
            return weeks + (weeks === 1 ? " week ago" : " weeks ago")
        }

        if (seconds < 3600 * 24 * 7 * 4 * 12) {
            const months = Math.floor(seconds / (3600 * 24 * 7 * 4))
            return months + (months === 1 ? " month ago" : " months ago")
        }

        const years = Math.floor(seconds / (3600 * 24 * 7 * 4 * 12))
        return years + (years === 1 ? " year ago" : " years ago")
    }


    function upvote() {
        let newScore = []
        let newDownvotes = comment.downvotes
        if (!comment.score.includes(data.currentUser.username)) {
            newDownvotes = newDownvotes.filter(i => i !== data.currentUser.username)
            newScore = [...comment.score, data.currentUser.username]

        } else {
            newScore = [...comment.score]
            const ind = newScore.indexOf(data.currentUser.username)
            newScore.splice(ind, 1)
        }

        setData((prev: AllType) => {
            prev.comments = prev.comments.map(i => {
                if (i.id === comment.id) {
                    i.score = newScore;
                    i.downvotes = newDownvotes
                    return i
                }
                if ("replies" in comment) return i

                i.replies = i.replies.map(j => {
                    if (j.id === comment.id) {
                        j.score = newScore
                        j.downvotes = newDownvotes
                    }
                    return j
                })

                return i
            })
            return { ...prev }
        })
    }

    function downvote() {
        let newDownvotes = [...comment.downvotes]
        let newScore = comment.score
        if (!comment.downvotes.includes(data.currentUser.username)) {
            newScore = newScore.filter(i => i !== data.currentUser.username)
            newDownvotes = [...comment.downvotes, data.currentUser.username]

        } else {
            const ind = newScore.indexOf(data.currentUser.username)
            newDownvotes.splice(ind, 1)
        }

        setData((prev: AllType) => {
            prev.comments = prev.comments.map(i => {
                if (i.id === comment.id) {
                    i.score = newScore;
                    i.downvotes = newDownvotes
                    return i
                }
                if ("replies" in comment) return i

                i.replies = i.replies.map(j => {
                    if (j.id === comment.id) {
                        j.score = newScore
                        j.downvotes = newDownvotes
                    }
                    return j
                })

                return i
            })
            return { ...prev }
        })
    }

    const isUp = comment.score.includes(data.currentUser.username);
    const isDown = comment.downvotes.includes(data.currentUser.username);

    return (
        <Fragment key={comment.id}>
            <div className="bg-neutral-white p-7 flex flex-col-reverse md:flex-row gap-6 rounded-lg items-start w-full relative" >
                <div className="flex md:flex-col items-center text-center md:gap-3 py-2 md:py-3 bg-neutral-very-light-gray w-24 md:w-11 rounded-xl">
                    <button className={`h-full w-full hover:text-primary-moderate-blue ${isUp ? "text-primary-moderate-blue" : "text-primary-light-grayish-blue"}`} onClick={upvote}>
                        <i className="fa-solid fa-plus  flex-1 text-sm md:text-base" />
                    </button>
                    <p className=" text-primary-moderate-blue font-semibold flex-1 text-base md:text-lg">{`${comment.score.length - comment.downvotes.length}`}</p>
                    <button className={`h-full w-full hover:text-primary-moderate-blue ${isDown ? "text-primary-moderate-blue" : "text-primary-light-grayish-blue"}`} onClick={downvote}>
                        <i className="fa-solid fa-minus flex-1 text-sm md:text-base"/>
                    </button>
                </div>
                <div className="w-full">
                    <div className="h-8 md:h-10 flex items-center gap-2 md:gap-4 w-full">
                        <img src={`src/${comment.user.image.webp}`} alt=""
                            className="h-full" />
                        <p className="font-medium text-neutral-dark-blue md:text-lg">{comment.user.username}</p>
                        {data.currentUser.username === comment.user.username &&
                            <div className="bg-primary-moderate-blue text-neutral-white px-2 text-sm md:text-base leading-5 md:leading-6 rounded-sm">you</div>
                        }
                        <p className="text-neutral-grayish-blue md:text-lg">{showTime()}</p>

                        <div className="absolute bottom-9 md:bottom-auto md:top-7 right-7">
                            {data.currentUser.username !== comment.user.username ?
                                <button disabled={edit} onClick={handleReply}
                                    className={`text-primary-moderate-blue font-medium md:text-xl ml-auto hover:scale-105 transition-transform duration-75 ease-linear`}>
                                    <i className="fa-solid fa-reply mr-1 text-base" /> Reply
                                </button>
                                :
                                <>
                                    <button disabled={edit} onClick={() => toggleWarning(handleDelete)} className="text-primary-soft-red font-medium md:text-xl ml-auto disabled:text-primary-pale-red enabled:hover:scale-105 transition-transform duration-75 ease-linear">
                                        <i className="fa-solid fa-trash mr-1 text-base" /> Delete
                                    </button>
                                    <button disabled={edit} onClick={handleEdit} className="text-primary-moderate-blue font-medium md:text-xl disabled:text-primary-light-grayish-blue enabled:hover:scale-105 transition-transform duration-75 ease-linear">
                                        <i className="fa-solid fa-pen mr-1 text-base ml-3" /> Edit
                                    </button>
                                </>

                            }
                        </div>
                    </div>

                    {!edit ?
                        <p className="text-neutral-grayish-blue md:text-lg mt-4 w-[90%] whitespace-pre-wrap">
                            {"replyingTo" in comment &&
                                <span className="text-primary-moderate-blue font-medium">@{comment.replyingTo} </span>
                            }{comment.content.trim()}
                        </p>
                        : editEl}
                </div>
            </div>
            {show && commentEl}
            {"replies" in comment && (comment.replies.length > 0 || show) &&
                <div className="w-full flex gap-1">
                    <div className="w-0.5 mr-3 md:mx-11 border" />
                    <div className="flex flex-col gap-6 flex-grow">
                        {/* {show && commentEl} */}
                        {replies}
                    </div>
                </div>
            }
        </Fragment>
    )
}