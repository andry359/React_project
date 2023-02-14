import React, { useEffect, useState } from 'react';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/modal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../hooks/usePost';
import PostService from '../API/PostService';
import MyLoader from '../components/UI/loader/MyLoader';
import { useFetching } from '../hooks/useFetching';
import { getPagesCount } from '../utils/pages';
import MyPagination from '../components/UI/pagination/MyPagination';
import MySelect from '../components/UI/select/MySelect';

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: '', query: '' });
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const sortedAndSearchedPost = usePosts(posts, filter.sort, filter.query);
    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = (response.headers['x-total-count']);
        setTotalPages(getPagesCount(totalCount, limit));
    });

    useEffect(() => {
        fetchPosts(limit, page);
    }, [limit])

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page);
        fetchPosts(limit, page)
    }

    return (
        <div className="App">
            <MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal >
            <hr style={{ margin: '15px 0' }} />
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <div style={{ marginTop: '25px' }}>
                <MySelect
                    value={limit}
                    onChange={value => setLimit(value)}
                    defaultValue='Количество элементов на странице'
                    options={[
                        { value: 5, name: '5' },
                        { value: 10, name: '10' },
                        { value: 25, name: '25' },
                        { value: -1, name: 'Показать все' },
                    ]}
                />
            </div>
            {postError &&
                <h1>Произошла ошибка! ${postError}</h1>
            }
            {isPostsLoading
                ? <div style={{ display: "flex", justifyContent: 'center', marginTop: "50px" }}><MyLoader /></div>
                : <PostList
                    remove={removePost}
                    posts={sortedAndSearchedPost}
                    title={'Список постов'}
                />}
            <MyPagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );



}

export default Posts;