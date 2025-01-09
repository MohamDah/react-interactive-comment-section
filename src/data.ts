
import julio from "./images/avatars/image-juliusomo.png"
import amyrobson from "./images/avatars/image-amyrobson.png"
import maxblagun from "./images/avatars/image-maxblagun.png"
import ramsesmiron from "./images/avatars/image-ramsesmiron.png"

const data = {
    "currentUser": {
        "image": {
            "png": julio,
            "webp": julio
        },
        "username": "juliusomo"
    },
    "comments": [
        {
            "id": 1,
            "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
            "createdAt": "1736322852901",
            "score": [],
            "user": {
                "image": {
                    "png": amyrobson,
                    "webp": amyrobson
                },
                "username": "amyrobson"
            },
            "replies": [],
            "downvotes": []
        },
        {
            "id": 2,
            "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
            "createdAt": "1736322852901",
            "score": [],
            "user": {
                "image": {
                    "png": maxblagun,
                    "webp": maxblagun
                },
                "username": "maxblagun"
            },
            "replies": [
                {
                    "id": 3,
                    "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                    "createdAt": "1736322852901",
                    "score": [],
                    "downvotes": [],
                    "replyingTo": "maxblagun",
                    "user": {
                        "image": {
                            "png": ramsesmiron,
                            "webp": ramsesmiron
                        },
                        "username": "ramsesmiron"
                    }
                },
                {
                    "id": 4,
                    "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant. \n\namogus",
                    "createdAt": "1736322852901",
                    "score": [],
                    "downvotes": [],
                    "replyingTo": "ramsesmiron",
                    "user": {
                        "image": {
                            "png": julio,
                            "webp": julio
                        },
                        "username": "juliusomo"
                    }
                }
            ],
            "downvotes": []
        }
    ],
    "userList": [
        {
            "image": {
                "png": julio,
                "webp": julio
            },
            "username": "juliusomo"
        },
        {
            "image": {
                "png": ramsesmiron,
                "webp": ramsesmiron
            },
            "username": "ramsesmiron"
        },
        {
            "image": {
                "png": maxblagun,
                "webp": maxblagun
            },
            "username": "maxblagun"
        },
        {
            "image": {
                "png": amyrobson,
                "webp": amyrobson
            },
            "username": "amyrobson"
        }
    ]
}

export default data