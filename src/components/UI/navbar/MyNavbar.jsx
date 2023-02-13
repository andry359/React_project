import React from 'react';
import classes from './MyNavbar.module.css';
import { Link } from 'react-router-dom';

const MyNavbar = () => {

    return (
        <div className={classes.myNavbar}>
            <div className={classes.navbar__likes}>
                <Link to='/about'>О сайте</Link>
                <Link to='/posts'>Посты</Link>
            </div>
        </div>
    )
}

export default MyNavbar;