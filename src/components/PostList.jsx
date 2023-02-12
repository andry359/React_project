import React from 'react';
import PostItem from './PostItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const PostList = ({ posts, title, remove }) => {

    {/* Условная отрисовка */ }
    if (!posts.length) {
        return (
            <h1 style={{ textAlign: 'center' }}>
                Посты не найдены!
            </h1>
        )
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>
                {title}
            </h1>
            <TransitionGroup>
                {posts.map((post, index) =>
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        // Внимание на название атрибута! Не className, а classNames (с s на конце)
                        classNames="post"
                    >
                        <PostItem remove={remove} number={index + 1} post={post} />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    )
}

export default PostList;