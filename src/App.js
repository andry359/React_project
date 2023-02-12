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

function App() {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPost = usePosts(posts, filter.sort, filter.query);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  async function fetchPosts() {
    setIsPostsLoading(true);
    setTimeout(async () => {
      const posts = await POstService.getAll();
      setPosts(posts);
      setIsPostsLoading(false);
    }, 1000)
  }

  return (
    <div className="App">
      <MyButton onClick={fetchPosts}>
        Get POSTS!
      </MyButton>
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
      {isPostsLoading
        ? <div style={{ display: "flex", justifyContent: 'center', marginTop: "50px" }}><MyLoader /></div>
        : <PostList
          remove={removePost}
          posts={sortedAndSearchedPost}
          title={'Посты про JS!'}
        />}

    </div>
  );
}

export default App;