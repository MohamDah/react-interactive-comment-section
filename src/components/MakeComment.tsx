import { AllType, CommentType, Reply } from "../types";
import { FormEvent, useState } from "react";
import { nanoid } from "nanoid";

export default function MakeComment({ replyTo, parent, data, setData, setShow }: {
    replyTo: CommentType | Reply | null,
    parent: CommentType | null
    data: AllType,
    setData: React.Dispatch<React.SetStateAction<any>>,
    setShow: React.Dispatch<React.SetStateAction<any>> | null
}) {
    const repUsername = replyTo?.user.username
    const [input, setInput] = useState(repUsername ? `@${repUsername} ` : "");

    function handleInput(value : string){
        if(replyTo && value.substring(0, `@${repUsername} `.length) !== `@${repUsername} `) return

        setInput(value)
    }

    function handleNewComment(e: FormEvent) {
        e.preventDefault();
        const frm = e.target as HTMLFormElement;


        

        if (parent === null || replyTo === null) {
            let newCom = {
                id: nanoid(),
                content: frm.comment.value,
                createdAt: `${new Date().getTime()}`,
                score: [],
                downvotes: [],
                user: data.currentUser,
                replies: [],
            }


            setData((prev: AllType) => ({
                ...prev,
                comments: [...prev.comments, newCom]
            }))
        } else {
            const newInput = input.substring(`@${repUsername} `.length - 1)
            let newCom = {
                id: nanoid(),
                content: newInput,
                createdAt: `${new Date().getTime()}`,
                score: [],
                downvotes: [],
                replyingTo: replyTo.user.username,
                user: data.currentUser
            }

            setData((prev: AllType) => ({
                ...prev,
                comments: prev.comments.map(i => {
                    if (i.id === parent.id){
                        i.replies.push(newCom);
                    }
                    return i
                } )
            }))
        }


        frm.reset();
        setInput("");
        !parent && setTimeout(() => { window.scrollTo(0, document.body.scrollHeight) });
        setShow && setShow((prev: boolean) => !prev);
    }


    return (
        <form onSubmit={handleNewComment} className="bg-neutral-white p-4 md:p-7 flex flex-col items-end md:flex-row md:items-start gap-6 rounded-lg w-full relative">
            <img src={`src/${data.currentUser.image.png}`} alt=""
                className="h-8 md:h-12 absolute md:relative left-5 bottom-6 md:left-0 md:bottom-0" />
            <textarea name="comment" id="comment" value={input} onChange={(e) => handleInput(e.target.value)}
                className="border rounded-lg w-full md:flex-grow resize-none h-28 md:h-32 px-6 py-3 text-lg focus:outline-none focus:border-neutral-grayish-blue" placeholder="Add a comment...">
                    
            </textarea>
            <button type="submit" className="bg-primary-moderate-blue text-neutral-white w-24 md:w-28 h-10 md:h-12 rounded-lg md:text-lg font-medium hover:scale-105 transition-transform transform ease-linear">{parent ? "REPLY" : "SEND"}</button>
        </form>
    )
}