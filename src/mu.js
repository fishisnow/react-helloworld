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
    const mutation = useMutation({
        mutationFn: createPost,
        onSuccess: (data) => {
            console.log('发布成功:', data);
        },
        onError: (error) => {
            console.error('发布失败:', error);
        }
    });

    return (
        <button
            onClick={() => mutation.mutate({ title: '新文章', body: '内容...' })}
            disabled={mutation.isPending}
        >
            {mutation.isPending ? '提交中...' : '提交'}
        </button>
    );
};