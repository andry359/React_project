import React, { useEffect, useState } from 'react';
import { useFetcher, useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import MyLoader from '../components/UI/loader/MyLoader';

const PostIdPage = () => {

    const params = useParams();
    const [post, setPosts] = useState({});
    const [comments, setComments] = useState([]);

    const [fetchPostbyId, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPosts(response.data);
    });
    const [fetchComments, isCommentsLoading, commentsError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data);
    });

    useEffect(() => {
        fetchPostbyId(params.id);
        fetchComments(params.id);
    }, []);

    return (
        <div>
            <h1 style={{ display: "flex", justifyContent: 'center', marginTop: "50px" }}>
                Пост №{params.id}
            </h1>
            {isLoading
                ? <div style={{ display: "flex", justifyContent: 'center', marginTop: "50px" }}><MyLoader /></div>
                : <div className='postPage'>
                    <h5 className='postPage__title'>{post.id}. {post.title}</h5>
                    <div className='postPage__body'>{post.body}</div>
                </div>
            }
            <div className='post__title'>
                <h1>
                    Комментарии
                </h1>
            </div>
            {isCommentsLoading
                ? <div style={{ display: "flex", justifyContent: 'center', marginTop: "50px" }}><MyLoader /></div>
                : <div className='comments'>
                    {comments.map(comment =>
                        <div className='comments__item comment' key={comment.id}>
                            <h5 className='comment__title'>{comment.email}</h5>
                            <div className='comment__body'>{comment.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    )

}

export default PostIdPage;