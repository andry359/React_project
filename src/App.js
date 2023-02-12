import React, { useMemo, useState } from 'react';
import './styles/App.css'
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';

function App() {

  const [posts, setPosts] = useState([
    { id: 1, title: "aa", body: "bb" },
    { id: 2, title: "rr", body: "zz" },
    { id: 3, title: "yy", body: "oo" },
  ]);
  const [filter, setFilter] = useState({ sort: '', query: '' });

  // Тут лежит еще один массив, но отсортированный по заголовку или по содержанию, а массив posts никак не изменяется. На основании этого отсортированного массива мы и будет реализовывать поиск
  const sortedPosts = useMemo(() => {
    console.log('Отработала функция сортировки постов!');
    if (filter.sort) {
      // Интересная реализация копирования массива для сортировки, чтобы избежать мутабельности
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts
  }, [filter.sort, posts]);
  // Функция поиска и сортировки. Возвращает отсортированный по задданным полям массив
  const sortedAndSearchedPost = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
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