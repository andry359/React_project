import { useMemo } from 'react';

// Хук который что-то сортирует и возвращает отсортированный массив
export const useSortedPosts = (posts, sort) => {
    // Тут лежит еще один массив, но отсортированный по заголовку или по содержанию, а массив posts никак не изменяется. 
    // На основании этого отсортированного массива мы и будет реализовывать поиск
    const sortedPosts = useMemo(() => {
        console.log('Отработала функция сортировки постов!');
        if (sort) {
            // Интересная реализация копирования массива для сортировки, чтобы избежать мутабельности
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts
    }, [sort, posts]);

    return sortedPosts;
}

// Возвращаем массив и отсортированных и отфильтрованных постов
export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort);
    // Функция поиска и сортировки. Возвращает отсортированный по задданным полям массив
    const sortedAndSearchedPost = useMemo(() => {
        //! Тут есть ошибка: нельзя воспользоваться поисковой строкой если выставить option в значении "по содержанию", т.к в функции filter мы передаем post.title, а не post.body.
        //! Таким образом можно сказать, что всегда будет производиться поиск по названию, при использовании option в значении "по содержанию". Обратный пример (всегда поиск по
        //! содержанию) приведен в закомментированной строке ниже
        //! return sortedPosts.filter(post => post.body.toLowerCase().includes(filter.query.toLowerCase()))
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedPosts]);

    return sortedAndSearchedPost;
}