import React, {useEffect, useState} from 'react';
import './Home.scss';
import {CardItem} from "components";
import {Spin, Dropdown, Menu, Form, Button, Checkbox} from "antd";
import arrow from "../../assets/img/arrow.svg"
import city from "../../assets/img/cityblue.svg"
import peopleImage from "../../assets/img/people-image.jpg"
import {connect, useSelector} from 'react-redux';
import {addinfoActions} from "redux/actions";
import {Link} from 'react-router-dom';
import {SearchOutlined, DownOutlined, SwapOutlined} from '@ant-design/icons';
import {SearchLocationInput} from "components";
import FooterSearch from "../../components/Search/FooterSearch/FooterSearch";


const Home = ({fetchUserAddInfos, results, isLoading, filterAddInfos}) => {

    const [startAge, setStartAge] = useState(1);
    const [endAge, setEndAge] = useState(45);
    const ageRange = [...Array(70).keys()].slice(1, 70);

    const [userAdress, setUserAdress] = useState();

    const [sex, setSex] = useState();

    let isAuth = useSelector(state => state.user.isAuth)
    useEffect(() => {
        fetchUserAddInfos(1, 6);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filterUsers = () => {
        filterAddInfos(startAge, endAge, userAdress, sex);
    }

    if (isLoading) {
        return (
            <div>
                <div className="spin-load">
                    <Spin size="large" tip="Loading..."/>
                </div>
                <FooterSearch/>
            </div>
        );
    }

    const DropdownMenu = (age) => {
        return (
            <Menu className="dropdown_menu">
                {ageRange.map((num) => {
                    if (age === "startAge") {

                        return (<Menu.Item key={num} onClick={e => {
                            setStartAge(e.key)
                        }}> {num} </Menu.Item>);

                    }
                    return (<Menu.Item key={num} onClick={e => setEndAge(e.key)}> {num} </Menu.Item>);
                })}
            </Menu>
        );
    };

    return (
        <div className="home-page">
            <section className="welcome">
                <div className="welcome__top">
                    <div className="search__block">
                        <div className="search__block-wrapper">
                            <h1>Input your preferences</h1>
                            <div className="filters">
                                <Form className="filter-form"
                                      name="time_related_controls"
                                      initialValues={{remember: true,}}
                                      onSubmit={filterUsers}
                                >
                                    <Form.Item name="range-picker" hasFeedback>
                                        <div className="age-picker">
                                            <p>Age:</p>
                                            <div className="age__dropdowns">
                                                <Dropdown
                                                    className="age__dropdowns-item"
                                                    overlay={DropdownMenu("startAge")}
                                                    placement="bottomLeft"
                                                    trigger={['click']}
                                                >
                                                    <Button className="age-btn"> {startAge} <DownOutlined/></Button>
                                                </Dropdown>
                                                <div className="arrows">
                                                    <SwapOutlined/>

                                                </div>
                                                <Dropdown
                                                    className="age__dropdowns-item"
                                                    overlay={DropdownMenu()}
                                                    placement="bottomLeft"
                                                    trigger={['click']}
                                                >
                                                    <Button className="age-btn"> {endAge} <DownOutlined/></Button>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </Form.Item>
                                </Form>
                                <Form>
                                    <Form.Item hasFeedback>
                                        <div className="check__picker">
                                            <p>City:</p>
                                            <SearchLocationInput parentCallback={setUserAdress} onChange={() => null}/>
                                        </div>
                                    </Form.Item>
                                </Form>
                                <Form>
                                    <Form.Item hasFeedback>
                                        <div className="check__picker">
                                            <div><p>Gender:</p></div>
                                            <div><Checkbox
                                                onChange={e => e.target.checked ? setSex(e.target.checked) : setSex(undefined)}
                                                className="check__picker-item">Male</Checkbox>
                                                <Checkbox
                                                    onChange={e => e.target.checked ? setSex(!e.target.checked) : setSex(undefined)}
                                                    className="check__picker-item check__picker-item--female">Female</Checkbox>
                                            </div>
                                        </div>
                                        <div className="filter__submit">
                                            <Link to={'/search'}>
                                                <button onClick={filterUsers}
                                                        className="search__submit__button"
                                                        type="primary"
                                                        htmltype="submit"
                                                ><p> OK </p>
                                                </button>
                                            </Link>
                                        </div>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>

                    </div>
                    <div className="slogan">
                        <div className="slogan__top">
                            <p>FIND YOUR</p>
                        </div>
                        <div className="slogan__bottom">
                            <p>NEIGHBOUR</p>
                        </div>
                        {isAuth ? <Link to={"/search"} className="join-link">
                                <button className="join-button">Search
                                </button>
                            </Link> :
                            <Link to={"/signup"} className="join-link">
                                <button className="join-button">Join us
                                </button>
                            </Link>}
                    </div>

                </div>
                <div className="welcome__bottom">
                    <div className="suit__block">
                        <div className="suit__block-slogan">
                            <p>Maybe they will suit you</p>
                        </div>
                        <img className="suit__block-arrow" src={arrow} alt="arrow"/>
                    </div>
                </div>
            </section>
            <section className="examples">
                <div className="examples__list">

                    {results.slice(0, 6).map((userInfo) => (

                        <CardItem card={userInfo} key={userInfo.id}/>

                    ))}

                </div>
                <div className="examples__see-more">
                    <Link to={'/search'} className="examples__see-more-link">{"See more options "}
                        <SearchOutlined style={{fontSize: "20px"}}/>
                    </Link>
                </div>
            </section>
            <section className="about">
                <div className="about__div__img">
                    <img className="about__image" src={peopleImage} alt="people"/></div>
                <div className="about__article">
                    <p>
                        We are a Lviv team of students who wanted to help people communicate more with each other
                        through <br/>
                        our web application that will help people find neighbour for divide the rent and living space
                        "in two clicks". <br/>
                        All you need to do is just register in our application and find or create an event that others
                        can join.
                    </p>
                </div>
            </section>
            <section className="footer">
                <img className="footer__city" src={city} alt="City blue"/>
                <div className="footer__info">
                    <div className="footer__info-top">
                        <div className="contacts">
                            <p>Contact us:</p>
                            <p>Gmail: propositumtop@gmail.com</p>
                            <p>Mobile: +380993598947</p>
                        </div>
                        <div className="about-us">
                            <h3 className='about_us_text'>About us:</h3>
                            <p>We are a group of students from Ukraine,
                                who love making beautiful applications and realize cool ideas.
                            </p>
                        </div>
                    </div>
                    <div className="footer__info-bottom">
                        <p> Made By Propositum </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default connect(
    ({addinfo}) => ({
        items: addinfo.items,
        results: addinfo.results,
        pageSize: addinfo.pageSize,
        totalCount: addinfo.totalCount,
        isLoading: addinfo.isLoading
    }),
    addinfoActions
)(Home);
