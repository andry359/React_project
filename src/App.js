import React, { useEffect, useState } from 'react';
import './styles/App.css'
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/modal/MyModal';
import MyButton from './components/UI/button/MyButton';
import { usePosts } from './hooks/usePost';
import POstService from './API/PostService';
import MyLoader from './components/UI/loader/MyLoader';
import { useFetching } from './hooks/useFetching';
import { getPagesArray, getPagesCount } from './utils/pages';
import MyPagination from './components/UI/pagination/MyPagination';

function App() {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const sortedAndSearchedPost = usePosts(posts, filter.sort, filter.query);
  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await POstService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = (response.headers['x-total-count']);
    setTotalPages(getPagesCount(totalCount, limit));
  })
  console.log(totalPages);

  useEffect(() => {
    fetchPosts(limit, page);
  }, [])

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
      {postError &&
        <h1>Произошла ошибка! ${postError}</h1>
      }
      {isPostsLoading
        ? <div style={{ display: "flex", justifyContent: 'center', marginTop: "50px" }}><MyLoader /></div>
        : <PostList
          remove={removePost}
          posts={sortedAndSearchedPost}
          title={'Посты про JS!'}
        />}
      <MyPagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default App;