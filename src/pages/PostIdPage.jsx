import React, { useEffect, useState } from 'react';
import { useFetcher, useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import MyLoader from '../components/UI/loader/MyLoader';

const PostIdPage = () => {

    const params = useParams();
    const [post, setPosts] = useState({});

    const [fetchPostbyId, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPosts(response.data);
    });

    useEffect(() => {
        fetchPostbyId(params.id);
    }, []);

    return (
        <div>
            <h1>
                Пост №{params.id}!
            </h1>
            {isLoading
                ? <div style={{ display: "flex", justifyContent: 'center', marginTop: "50px" }}><MyLoader /></div>
                : <div>{post.id} - {post.title}</div>
            }
        </div>
    )

}

export default PostIdPage;