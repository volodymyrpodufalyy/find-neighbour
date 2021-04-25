import React from 'react';
import { Chat } from "pages"
import './Home.scss';


// TODO: ДОБАВИТИ HEADER ДЛЯ НАВІГАЦІЇ, ВКЛАСТИ СТОРІНКУ ДОДАТКОВОЇ ІНФИ, ПРОФІЛЮ І ГОЛОВНУ, 
// ЗРОБИТИ SETTINGS, SEARCH PAGE

const Home = () => {
    return (
    <section className="home">
         <Chat />
     </section>
    );
};

export default Home;