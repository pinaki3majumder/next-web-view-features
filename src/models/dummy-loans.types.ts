export type Post = { id: number; title: string; body: string };

export type Comments = {
    postId: number;
    id: number;
    name: string;
    body: string;
    email: string;
};

export type Todos = { userId: number; id: number; title: string; completed: boolean };

export type Photos = {
    albumId: number;
    id: number;
    url: string;
    thumbnailUrl: string;
};