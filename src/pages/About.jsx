import React, { useEffect, useState } from 'react';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/modal/MyModal';
import PostForm from '../components/PostForm';
import { Link } from 'react-router-dom';


const About = () => {

    const [modal, setModal] = useState(false);

    return (
        <div className='about'>
            <div className='about__wrapper'>
                <p className='about__text'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores, consequuntur laudantium, minima dolorum doloribus enim similique delectus iure beatae libero a quisquam! Quasi, sequi deserunt. Quibusdam cum suscipit illo ex repudiandae tempora sed, facilis nihil, est iusto perspiciatis aliquam sequi, sint expedita! Ab dolores facere doloremque veritatis perspiciatis, velit quae nostrum laboriosam animi delectus reprehenderit ducimus esse enim molestias atque sint repellat? Quaerat consequatur, voluptate facilis rem a similique fugiat aliquam enim tempora inventore nemo beatae possimus exercitationem sunt ad, iure tenetur omnis quam perspiciatis! Sint vero voluptatem minus iure maxime non ut commodi unde modi enim quo possimus eius facere impedit, sunt ullam doloribus! Ex eum iure saepe laudantium voluptate similique est ipsam nemo ab repellat, eligendi quibusdam. Optio nesciunt modi accusantium voluptates saepe alias, dolorem voluptate quis iure sunt adipisci fugiat facilis quasi explicabo suscipit laudantium a? Laboriosam quod cumque dolore excepturi odio quia aperiam dignissimos mollitia molestias.
                </p>
                <Link to='/posts'>
                    <MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
                        Перейти к списку постов
                    </MyButton>
                </Link>
            </div>
        </div>
    )
}

export default About;