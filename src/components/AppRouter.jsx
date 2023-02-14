import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About';
import Posts from '../pages/Posts';
import Error from '../pages/Error';
import PostIdPage from '../pages/PostIdPage';
import { privateRoutes, publicRoutes } from '../router/routes';

const AppRouter = () => {

    const isAuth = true;

    return (

        isAuth
            ? <Routes>
                {privateRoutes.map((route, index) => {
                    return (
                        < Route element={< route.element />} path={route.path} key={index} />
                    )
                })}
            </Routes>
            : <Routes>
                {publicRoutes.map((route, index) => {
                    return (
                        < Route element={< route.element />} path={route.path} key={index} />
                    )
                })}
            </Routes>

    )
}

export default AppRouter;