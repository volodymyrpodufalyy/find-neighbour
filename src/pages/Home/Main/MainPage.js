import React from "react";
import './App.css';

import main_img from "./1st-main2-img.jpg"
import main_logo from "./logo_neifhbor.png"

const MainPage =()=> {
    return (
        <div className="App">
            <body>
            <div className="image1">
                <img className="main_img" src={main_img} alt=""/>
            </div>

            <div className="but2">

                <div className="but3"><p><input className="but1" type="button" value=" Join us "></input></p></div>


                <div className="website">
                    <div className="window">
                        <p>Search neighbourhood in UA</p>
                        <div className="txt3">

                            <p className="brightred">I have an apartment</p>
                            <p>I'm looking for</p>
                        </div>
                        <input type="text" className="first" placeholder="Lviv"></input>
                        <div className="txt1">
                            <p>Min price</p>
                            <p>Max price</p>
                        </div>
                        <div className="fns">
                            <input type="text" className="second" placeholder="No min"></input>

                            <input type="text" className="third" placeholder="No max"></input>
                        </div>
                        <div className="txt2">
                            <p>Gender</p>
                            <p>About pets</p>
                        </div>
                        <div className="fnf">
                            <input type="button" className="fourth"></input>
                            <input type="button" className="fifth"></input>
                        </div>
                        <div className="windowbut">
                            <input className="adv_but" type="button" value="Advanced search options"></input>
                            <input className="search_but" type="button" value="search"></input>
                        </div>
                    </div>
                </div>
            </div>
            <div className="users">
                <div className="user1">
                    <h3>Wade A</h3>
                    <p>Lorem ipsum</p>
                    <input className="UserBut1" type="button" value="Contact"></input>
                </div>
                <div className="user2">
                    <h3>Wade A</h3>
                    <p>Lorem ipsum</p>
                    <input className="UserBut1" type="button" value="Contact"></input>
                </div>
                <div className="user3">
                    <h3>Wade A</h3>
                    <p>Lorem ipsum</p>
                    <input className="UserBut1" type="button" value="Contact"></input>
                </div>
                <div className="user4">
                    <h3>Wade A</h3>
                    <p>Lorem ipsum</p>
                    <input className="UserBut1" type="button" value="Contact"></input>
                </div>
            </div>
            </body>

        </div>

  );
}

export default MainPage;