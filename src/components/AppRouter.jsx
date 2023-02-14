import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../router/routes';
import { AuthContext } from '../context';

const AppRouter = () => {

    const { isAuth, setIsAuth } = useContext(AuthContext);

    console.log(isAuth);
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