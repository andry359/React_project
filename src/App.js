import React, { useMemo, useState } from 'react';
import './styles/App.css'
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import MyInput from './components/UI/input/MyInput';

function App() {

  const [posts, setPosts] = useState([
    { id: 1, title: "aa", body: "bb" },
    { id: 2, title: "rr", body: "zz" },
    { id: 3, title: "yy", body: "oo" },
  ]);
  const [selectedSort, setSelectedSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Тут лежит еще один массив, но отсортированный, а массив posts никак не изменяется. На основании этого отсортированного массива мы и будет реализовывать поиск
  const sortedPosts = useMemo(() => {
    console.log('Отработала функция сортировки постов!');
    if (selectedSort) {
      // Интересная реализация копирования массива для сортировки, чтобы избежать мутабельности
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
    }
    return posts
  }, [selectedSort, posts]);
  // Функция поиска и сортировки. Возвращает отсортированный по задданным полям массив
  const sortedAndSearchedPost = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }
  const sortPosts = (sort) => {
    setSelectedSort(sort);
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }} />
      <div>
        <MyInput
          placeholder='Поиск блога...'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Сортировка по"
          options={[
            { value: 'title', name: 'По названию' },
            { value: 'body', name: 'По содержанию' }
          ]}
        />
      </div>
      {/* Условная отрисовка */}
      {sortedAndSearchedPost.length !== 0
        ?
        <PostList remove={removePost} posts={sortedAndSearchedPost} title={'Посты про JS!'} />
        :
        <h1 style={{ textAlign: 'center' }}>
          Посты не найдены!
        </h1>
      }

    </div>
  );
}

export default App;
