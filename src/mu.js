import { useMutation } from '@tanstack/react-query';

const createPost = async (newPost) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
    });
    return res.json();
};

export const PostForm = () => {
    const mutation = useMutation(createPost);

    return (
        <button
            onClick={() => mutation.mutate({ title: '新文章', body: '内容...' })}
        >
            提交
        </button>
    );
};
