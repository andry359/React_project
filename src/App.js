import React, { useState } from 'react';
import './styles/App.css'
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/modal/MyModal';
import MyButton from './components/UI/button/MyButton';
import { usePosts } from './hooks/usePost';

function App() {

  const [posts, setPosts] = useState([
    { id: 1, title: "aa", body: "bb" },
    { id: 2, title: "rr", body: "zz" },
    { id: 3, title: "yy", body: "oo" },
    { id: 4, title: "Посмотреть курс реакт", body: "разобраться как работает реакт приложение" },
    { id: 5, title: "А как сортировать?", body: "ыЫы" },
  ]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPost = usePosts(posts, filter.sort, filter.query);


  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
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
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPost}
        title={'Посты про JS!'}
      />
    </div>
  );
}

export default App;