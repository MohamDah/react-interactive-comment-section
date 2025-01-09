import { FormEvent, useState } from "react";
import { AllType, User } from "../types";
import defautPfp from "../images/avatars/image-default.png"

export default function ChangeUser({ data, toggleChange, setData }: { data: AllType, toggleChange: (value: boolean) => void, setData: React.Dispatch<React.SetStateAction<any>> }) {
    let userList: User[] = [...data.userList]
    const [valMessage, setValMessage] = useState("")

    const userEls = userList.map(user => {
        const isUserCls = user.username === data.currentUser.username ? "opacity-50" : ""
        return (
            <div className="flex border rounded-lg overflow-hidden" key={user.username}>
                <button  onClick={() => chUser(user)} disabled={!!isUserCls} className={`w-full  flex h-12 md:h-16 px-3 py-2 items-center gap-3 overflow-x-hidden ${isUserCls}`}>
                    <img src={`src/${user.image.png}`} alt="profile picture" className="h-full" />
                    <p className="text-neutral-dark-blue text-base md:text-lg font-medium">{user.username}</p>
                    {isUserCls && <p className="font-medium text-neutral-dark-blue text-sm">Current User</p>}
                </button>
                {
                user.image.png === "./images/avatars/image-default.png" &&
                user.username !== data.currentUser.username &&
                <button className="px-2 bg-red-500 hover:bg-red-600 text-neutral-white font-medium" onClick={() => deleteUser(user)}>Delete</button>
                }
            </div>
        )
    })


    function chUser(user: User) {
        setData((prev: AllType) => {
            prev.currentUser = user;
            return { ...prev }
        })
        toggleChange(true)
    }

    function newUser(e: FormEvent) {
        e.preventDefault();
        const frm = e.target as HTMLFormElement
        const username = frm.username.value

        if (data.userList.some(user => user.username === username)) {
            setValMessage("Username already exists!");
            return;
        }

        const userObj: User = {
            image: {
                png: "./images/avatars/image-default.png",
                webp: "./images/avatars/image-default.png"
            },
            username: username
        }

        userList.push(userObj)

        setData((prev: AllType) => {
            const newPrev = { ...prev }
            newPrev.userList = userList

            return newPrev
        })

        setValMessage("");
        chUser(userObj)
    }


    function deleteUser(user: User) {
        userList = userList.filter(i => i.username !== user.username)

        setData((prev: AllType) => {
            const newPrev = { ...prev }
            newPrev.userList = userList

            newPrev.comments = newPrev.comments.filter(i => i.user.username !== user.username);

            newPrev.comments = newPrev.comments.map(i => {
                i.replies = i.replies.filter(j => j.user.username !== user.username);
                return i
            })

            return newPrev
        })

    }



    return (
        <>
            <div className="w-full h-full bg-black opacity-50 fixed z-10 left-0 top-0">
            </div>
            <div className="bg-neutral-white max-w-[450px] w-11/12 md:max-w-none md:w-[450px] fixed z-20 -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2 p-6 md:p-9 rounded-xl space-y-3 max-h-[400px] xl:max-h-[600px] overflow-y-scroll">
                <button onClick={() => toggleChange(true)} className="text-3xl text-neutral-dark-blue"><i className="fa-solid fa-xmark mb-4" /></button>
                {userEls}

                    {valMessage &&
                        <p className="text-primary-soft-red text-center self-center">{valMessage}</p>
                    }
                <form onSubmit={newUser} className="mt-2 w-full flex flex-col items-end border rounded-lg px-3 py-2">
                    <div className="w-full flex h-8 md:h-12 items-center gap-3">
                        <img src={defautPfp} alt="" className="h-full" />
                        <input className="border h-full w-full rounded-sm p-2" type="text" name="username" placeholder="Username..." />
                    </div>
                    <button className="bg-primary-moderate-blue text-neutral-white h-full md:px-2 py-1.5 md:py-3 leading-tight min-w-28 rounded-lg mt-2 hover:scale-105 transition-transform transform ease-linear" type="submit">Create User</button>
                </form>
            </div>
        </>
    )
}