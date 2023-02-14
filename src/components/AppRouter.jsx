import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About';
import Posts from '../pages/Posts';
import Error from '../pages/Error';
import PostIdPage from '../pages/PostIdPage';
import { routes } from '../router/routes';

const AppRouter = () => {

    return (
        <Routes>
            {/* <Route path='/about' element={<About />} />
            <Route path='/posts' element={<Posts />} />
            <Route path='/posts/:id' element={<PostIdPage />} />
            <Route path='/*' element={<Error />} />
            <Route path='/' element={<About />} /> */}
            {routes.map((route, index) => {
                return (
                    < Route element={< route.element />} path={route.path} key={index} />
                )
            })}
        </Routes>
    )
}

export default AppRouter;