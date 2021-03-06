import React, { useEffect, useState } from "react";
import "./Home.scss";
import { CardItem } from "components";
import { Spin, Dropdown, Menu, Form, Button, Checkbox } from "antd";
import arrow from "../../assets/img/arrow.svg";
import city from "../../assets/img/cityblue.svg";
import peopleImage from "../../assets/img/people-image.jpg";
import { connect } from "react-redux";
import { addinfoActions } from "redux/actions";
import { Link } from "react-router-dom";
import { SearchOutlined, DownOutlined, SwapOutlined } from "@ant-design/icons";
import { SearchLocationInput } from "components";

const Home = ({ fetchUserAddInfos, results, isLoading, filterAddInfos }) => {
  const [startAge, setStartAge] = useState(1);
  const [endAge, setEndAge] = useState(45);
  const ageRange = [...Array(70).keys()].slice(1, 70);

  const [userAdress, setUserAdress] = useState();

  const [sex, setSex] = useState();

  useEffect(() => {
    fetchUserAddInfos(1, 6);
  }, []);

  const filterUsers = () => {
    filterAddInfos(startAge, endAge, userAdress, sex);
  };

  if (isLoading) {
    return (
      <div className="spin-load">
        <Spin size="large" tip="Завантаження..." />
      </div>
    );
  }

  const DropdownMenu = (age) => {
    return (
      <Menu className="dropdown-menu">
        {ageRange.map((num) => {
          if (age === "startAge") {
            return (
              <Menu.Item key={num} onClick={(e) => setStartAge(e.key)}>
                {" "}
                {num}{" "}
              </Menu.Item>
            );
          }
          return (
            <Menu.Item key={num} onClick={(e) => setEndAge(e.key)}>
              {" "}
              {num}{" "}
            </Menu.Item>
          );
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
                <Form
                  className="filter-form"
                  name="time_related_controls"
                  initialValues={{ remember: true }}
                  onSubmit={filterUsers}
                >
                  <Form.Item name="range-picker" hasFeedback>
                    <div className="age-picker">
                      <p>Вік:</p>
                      <div className="age__dropdowns">
                        <Dropdown
                          className="age__dropdowns-item"
                          overlay={DropdownMenu("startAge")}
                          placement="bottomLeft"
                          trigger={["click"]}
                        >
                          <Button className="age-btn">
                            {" "}
                            {startAge} <DownOutlined />
                          </Button>
                        </Dropdown>
                        <div className="arrows">
                          <SwapOutlined />
                        </div>
                        <Dropdown
                          className="age__dropdowns-item"
                          overlay={DropdownMenu()}
                          placement="bottomLeft"
                          trigger={["click"]}
                        >
                          <Button className="age-btn">
                            {" "}
                            {endAge} <DownOutlined />
                          </Button>
                        </Dropdown>
                      </div>
                    </div>
                  </Form.Item>
                </Form>
                <Form>
                  <Form.Item hasFeedback>
                    <div className="check__picker">
                      <p>Місто:</p>
                      <SearchLocationInput
                        parentCallback={setUserAdress}
                        onChange={() => null}
                      />
                    </div>
                  </Form.Item>
                </Form>
                <Form>
                  <Form.Item hasFeedback>
                    <div className="check__picker">
                      <p>Стать:</p>
                      <Checkbox
                        onChange={(e) =>
                          e.target.checked
                            ? setSex(e.target.checked)
                            : setSex(undefined)
                        }
                        className="check__picker-item"
                      >
                        Чоловік
                      </Checkbox>
                      <Checkbox
                        onChange={(e) =>
                          e.target.checked
                            ? setSex(!e.target.checked)
                            : setSex(undefined)
                        }
                        className="check__picker-item check__picker-item--female"
                      >
                        Жінка
                      </Checkbox>
                    </div>
                    <button
                      onClick={filterUsers}
                      className="search__submit__button"
                      type="primary"
                      htmltype="submit"
                    >
                      <p> OK </p>
                    </button>
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
            <button className="join-button">
              <Link to={"/signup"} className="join-link">
                Join us{" "}
              </Link>
            </button>
          </div>
        </div>
        <div className="welcome__bottom">
          <div className="suit__block">
            <div className="suit__block-slogan">
              <p>Maybe they will suit you</p>
            </div>
            <img className="suit__block-arrow" src={arrow} alt="arrow"></img>
          </div>
        </div>
      </section>
      <section className="examples">
        <ul className="examples__list">
          {results.slice(0, 6).map((userInfo) => (
            <li key={userInfo.id}>
              <CardItem card={userInfo} />
            </li>
          ))}
        </ul>
        <div className="examples__see-more">
          <Link to={"/search"} className="examples__see-more-link">
            {"See more options "}
            <SearchOutlined style={{ fontSize: "20px" }} />
          </Link>
        </div>
      </section>
      <section className="about">
        <div className="about__div__img">
          <img className="about__image" src={peopleImage} alt="people"></img>
        </div>
        <div className="about__article">
          <p>
            Let’s start with the words you use to describe yourself. They say a
            picture is worth a thousand words, but our singles consistently tell
            us that a profile description matters more to them than a photo.
          </p>
          <p>
            It’s important, especially on a serious dating site, that you take
            the time to make your written presentation as good as it can be, and
            reveal your true self honestly and carefully.
          </p>
          <p>
            And words can break the ice! It can be hard to introduce yourself to
            a single you find interesting; it is always difficult to find the
            right way to approach them and find THE message that will attract
            their attention.
          </p>
        </div>
      </section>
      <section className="footer">
        <img className="footer__city" src={city} alt="City blue"></img>
        <div className="footer__info">
          <div className="footer__info-top">
            <div className="contacts">
              <p>Contact us:</p>
              <p>Gmail: propositumtop@gmail.com</p>
            </div>
            <div className="about-us">
              <h3 className="about_us_text">About us:</h3>
              <p>
                We are a group of students from Ukraine, who love making
                beautiful applications and realize cool ideas.
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
  ({ addinfo }) => ({
    items: addinfo.items,
    results: addinfo.results,
    pageSize: addinfo.pageSize,
    totalCount: addinfo.totalCount,
    isLoading: addinfo.isLoading,
  }),
  addinfoActions
)(Home);
