import { Fragment } from "react/jsx-runtime";

type User = {
    image: {
        png: string;
        webp: string;
    };
    username: string;
};

type Reply = {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    replyingTo: string;
    user: User;
};

type Comment = {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: User;
    replies: Reply[];
};



export default function Comment({ comment, currentUser }: { comment: Comment | Reply, currentUser: User }) {
    let replies: JSX.Element[] = [];
    if ("replies" in comment && comment.replies.length > 0) {
        replies = comment.replies.map(reply => <Comment comment={reply} currentUser={currentUser} key={reply.id} />)
    }


    return (
        <Fragment key={comment.id}>
            <div className="bg-neutral-white p-7 flex gap-6 rounded-lg items-start w-full" >
                <div className="flex flex-col items-center gap-3 py-3 bg-neutral-very-light-gray w-11 rounded-xl">
                    <i className="fa-solid fa-plus text-neutral-grayish-blue opacity-50" />
                    <p className="text-lg text-primary-moderate-blue font-semibold">{comment.score}</p>
                    <i className="fa-solid fa-minus text-neutral-grayish-blue opacity-50" />
                </div>
                <div className="w-full">
                    <div className="h-10 flex items-center gap-4 w-full">
                        <img src={`src/${comment.user.image.webp}`} alt=""
                            className="h-full" />
                        <p className="font-medium text-neutral-dark-blue text-lg">{comment.user.username}</p>
                        {currentUser.username === comment.user.username &&
                            <div className="bg-primary-moderate-blue text-neutral-white px-2 rounded-sm">you</div>
                        }
                        <p className="text-neutral-grayish-blue text-lg">{comment.createdAt}</p>

                        {currentUser.username !== comment.user.username ?
                            <p className="text-primary-moderate-blue font-medium text-xl ml-auto">
                                <i className="fa-solid fa-reply mr-1 text-base" /> Reply
                            </p>
                            :
                            <>
                                <p className="text-primary-soft-red font-medium text-xl ml-auto">
                                    <i className="fa-solid fa-trash mr-1 text-base" /> Delete
                                </p>
                                <p className="text-primary-moderate-blue font-medium text-xl">
                                    <i className="fa-solid fa-pen mr-1 text-base ml-3" /> Edit
                                </p>
                            </>

                        }
                    </div>

                    <p className="text-neutral-grayish-blue text-lg mt-4 w-[90%]">
                        {"replyingTo" in comment &&
                            <span className="text-primary-moderate-blue font-medium">@{comment.replyingTo}</span> 
                        }
                        {comment.content}
                    </p>
                </div>
            </div>

            {"replies" in comment && comment.replies.length > 0 &&
                <div className="w-full flex gap-1">
                    <div className="w-0.5 mx-11 border" />
                    <div className="flex flex-col gap-6">
                        {replies}
                    </div>
                </div>
            }
        </Fragment>
    )
}