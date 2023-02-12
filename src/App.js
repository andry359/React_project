import React, { useMemo, useState } from 'react';
import './styles/App.css'
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/modal/MyModal';
import MyButton from './components/UI/button/MyButton';

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
    //! Тут есть ошибка: нельзя воспользоваться поисковой строкой если выставить option в значении "по содержанию", т.к в функции filter мы передаем post.title, а не post.body.
    //! Таким образом можно сказать, что всегда будет производиться поиск по названию, при использовании option в значении "по содержанию". Обратный пример (всегда поиск по
    //! содержанию) приведен в закомментированной строке ниже
    //! return sortedPosts.filter(post => post.body.toLowerCase().includes(filter.query.toLowerCase()))
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts])

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