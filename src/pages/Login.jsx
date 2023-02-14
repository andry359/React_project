import React, { useContext } from 'react';
import MyInput from '../components/UI/input/MyInput';
import MyButton from '../components/UI/button/MyButton';
import { AuthContext } from '../context';

const Login = () => {

    const { isAuth, setIsAuth } = useContext(AuthContext);

    const login = (e) => {
        e.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true');
    }

    return (
        <div className='login'>
            <h1 className='login__title'>Введите личные данные</h1>

            <form className='login__form' onSubmit={login}>
                <MyInput type="text" placeholder='Введите логин' />
                <MyInput type="password" placeholder='Введите пароль' />
                <MyButton>Войти</MyButton>
            </form>

        </div>
    )
}

export default Login;