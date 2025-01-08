export type User = {
    image: {
        png: string;
        webp: string;
    };
    username: string;
};

export type Reply = {
    id: string;
    content: string;
    createdAt: string;
    score: string[];
    downvotes: string[];
    replyingTo: string;
    user: User;
};

export type CommentType = {
    id: string;
    content: string;
    createdAt: string;
    score: string[];
    downvotes: string[];
    user: User;
    replies: Reply[];
};


export type AllType = {
    currentUser: User;
    comments: CommentType[];
    userList: User[];
} 