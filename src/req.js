

import { useQuery } from '@tanstack/react-query';

const fetchPost = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    return res.json();
};

export const Post = () => {
    const { data, error, isLoading } = useQuery(['post', 1], fetchPost);

    if (isLoading) return <p>加载中...</p>;
    if (error) return <p>加载失败: {error.message}</p>;

    return <h1>{data.title}</h1>;
};
