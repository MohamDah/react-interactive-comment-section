import { FormEvent, useState } from "react";
import { AllType, CommentType, Reply } from "../types";

export default function EditComment({ comment, setData, setEdit }: { comment: CommentType | Reply, setData: React.Dispatch<React.SetStateAction<any>>, setEdit: React.Dispatch<React.SetStateAction<any>> }) {
    const [input, setInput] = useState(comment.content);

    function handleEditComment(e: FormEvent) {
        e.preventDefault()
        const frm = e.target as HTMLFormElement;

        if ("replies" in comment) {
            setData((prev: AllType) => ({
                ...prev,
                comments: prev.comments.map(i => {
                    if (i.id === comment.id) {
                        i.content = input
                    }
                    return i
                })
            }))
        } else {
            setData((prev: AllType) => ({
                ...prev,
                comments: prev.comments.map((i: CommentType) => {
                    i.replies = i.replies.map((j: Reply) => {
                        if (j.id === comment.id) {
                            j.content = input;
                        }

                        return j
                    })
                    return i
                })
            }))
        }
        frm.reset();
        setEdit && setEdit((prev: boolean) => !prev);

    }

    return (
        <form onSubmit={handleEditComment}
            className="bg-neutral-white flex flex-col gap-6 rounded-lg items-start w-full mt-2">
            <textarea name="comment" id="comment" value={input} onChange={(e) => { setInput(e.target.value) }}
                className="border rounded-lg w-full resize-none h-32 px-6 py-3 text-lg focus:outline-none focus:border-neutral-grayish-blue" placeholder="Edit reply...">
            </textarea>
            <button type="submit" className="bg-primary-moderate-blue text-neutral-white w-24 md:w-28 h-10 md:h-12 rounded-lg md:text-lg font-medium self-end">UPDATE</button>
        </form>
    )
}