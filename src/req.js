import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ErrorBoundary from './ErrorBoundary';

const fetchPost = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
};

const PostContent = () => {
    const [shouldFetch, setShouldFetch] = useState(false);

    const { data, error, isLoading } = useQuery({
        queryKey: ['post', 1],
        queryFn: fetchPost,
        enabled: shouldFetch
    });

    if (isLoading) return <p>加载中...</p>;
    if (error) return <p>加载失败: {error.message}</p>;

    return (
        <div>
            <button onClick={() => setShouldFetch(true)}>
                加载文章
            </button>
            {data && <h1>{data.title}</h1>}
        </div>
    );
};

export const Post = () => {
    return (
        <ErrorBoundary>
            <PostContent />
        </ErrorBoundary>
    );
};