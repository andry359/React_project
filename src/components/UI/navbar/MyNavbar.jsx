import React from 'react';
import { Link } from 'react-router-dom';

const MyNavbar = () => {

    return (
        <div className='navbar'>
            <div className='navbar__likes'>
                <Link to='/about'>О сайте</Link>
                <Link to='/posts'>Посты</Link>
            </div>
        </div>
    )
}

export default MyNavbar;