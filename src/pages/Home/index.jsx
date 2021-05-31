import './App.css';
import main_img from "./1st-main2-img.jpg"
import main_logo from "./logo_neifhbor.png"
import people_img from "./face.jpeg"
import bottompeople from "./bottompeopleimg.jpg"
import cityblue from "./cityblue.png"
function App() {
    return (
        <div className="App">
            <script src="https://kit.fontawesome.com/47f61c7504.js" crossOrigin="anonymous"></script>
            <body>
            <div className="navbar">
                <img className="logo_img" src={main_logo} alt=""/>
                <div className="navbuts">
                    <input className="navbut1" type="button" value="Have an account"></input>
                    <input className="navbut2" type="button" value="Join"></input>
                </div>
            </div>
            <div className="fullcontent">
                <div className="header">
                    <div className="image1">
                        <img className="main_img" src={main_img} alt=""/>
                    </div>
                    <div className="website">
                        <div className="window">
                            <p>Search neighbourhood in UA</p>
                            <div className="txt3">
                                <p className="brightred">I have an apartment</p>
                                <p>I'm looking for</p>
                            </div>
                            <div className="inputIcons">
                                <i className="fas fa-search icon"></i><input type="text" className="first"
                                                                             placeholder="Lviv"></input>
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
                                    <input type="text" className="fourth"></input>
                                    <input type="text" className="fifth"></input>
                                </div>
                            </div>
                            <div className="windowbut">
                                <input className="adv_but" type="button" value="Advanced search options"></input>
                                <input className="search_but" type="button" value="search"></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="but2">
                    <div className="but3"><p><input className="but1" type="button" value=" Join us "></input></p></div>
                </div>
                <div className="people">
                    <div className="pplblock">
                        <div className="users">
                            <div className="pplblock1">
                                <img src={people_img}></img>
                                <div className="aboba1">
                                    <h2>John john</h2>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                    <br></br>
                                    <p>Gender Man</p>
                                    <p>age 666</p>
                                    <input type="button" className="pplbut" value="contact"></input>
                                </div>
                            </div>
                            <div className="pplblock1">
                                <img src={people_img}></img>
                                <div className="aboba1">
                                    <h2>John john</h2>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                    <br></br>
                                    <p>Gender Man</p>
                                    <p>age 666</p>
                                    <input type="button" className="pplbut" value="contact"></input>
                                </div>
                            </div>
                        </div>
                        <div className="users1">
                            <div className="pplblock2">
                                <img src={people_img}></img>
                                <div className="aboba2">
                                    <h2>John john</h2>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                    <br></br>
                                    <p>Gender Man</p>
                                    <p>age 666</p>
                                    <input type="button" className="pplbut" value="contact"></input>
                                </div>
                            </div>
                            <div className="pplblock2">
                                <img src={people_img}></img>
                                <div className="aboba2">
                                    <h2>John john</h2>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                    <br></br>
                                    <p>Gender Man</p>
                                    <p>age 666</p>
                                    <input type="button" className="pplbut" value="contact"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom1">
                    <img src={bottompeople}></img>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, delectus deleniti eius eos, est
                        eveniet hic iste laboriosam maxime nam nobis rerum unde ut! Accusamus dolores id incidunt l
                        aboriosam voluptatum!Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
                        in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard
                        McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more
                        obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the
                        word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections
                        1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                        written in 45 BC. This book is a treatise on the theory of ethics, very popular during the
                        Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
                        section 1.10.32.
                        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                        Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                        their exact original form, accompanied by English versions from the 1914 translation by H.
                        Rackham.</p>
                </div>
                <div className="bottombut"><input className="but1" type="button" value=" Join us "></input></div>
            </div>
            <div className="footer">
                <img src={cityblue}></img>
                <div className="footertext">
                    <p>Contact us:<br></br>
                        Gmail: propositumtop@gmail.com
                        <br></br>Insta: Propositum_top
                        <br></br>Telegram: +38066666666
                        <br></br>Viber: +38066666666</p>
                    <p>About us: Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                        dolorum error esse est
                        harum labore minima minus necessitatibus obcaecati officiis perspiciatis possimus quae quia
                        quidem recusandae repellendus saepe, similique sunt.</p>
                </div>
                <div className="last">
                    <h1>Lorem ipsum dolor sit.</h1>
                </div>
            </div>
            </body>
        </div>
    );
}
export default App;
