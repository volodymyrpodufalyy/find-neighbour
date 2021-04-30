import React from 'react';
import { Chat } from "pages"
import './Home.scss';
import MainPage from "./Main/MainPage";


// TODO: ДОБАВИТИ HEADER ДЛЯ НАВІГАЦІЇ, ВКЛАСТИ СТОРІНКУ ДОДАТКОВОЇ ІНФИ, ПРОФІЛЮ І ГОЛОВНУ,
// ЗРОБИТИ SETTINGS, SEARCH PAGE

const Home = () => {
    return (
    <section className="home">
      <MainPage/>
     </section>
    );
};

export default Home;
