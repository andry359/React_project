import React from 'react';
import classes from './MyNavbar.module.css';
import { Link } from 'react-router-dom';
import MyButton from '../button/MyButton';
import { useContext } from 'react';
import { AuthContext } from '../../../context';

const MyNavbar = () => {

    const { isAuth, setIsAuth } = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth');
    }

    return (
        <div className={classes.myNavbar}>
            <MyButton onClick={logout}>
                Выйти
            </MyButton>
            <div className={classes.navbar__likes}>
                <Link to='/about'>О сайте</Link>
                <Link to='/posts'>Посты</Link>
            </div>
        </div>
    )
}

export default MyNavbar;