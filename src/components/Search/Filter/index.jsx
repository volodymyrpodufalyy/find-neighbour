import React from "react";
import { Form, Dropdown, Menu, Button, Checkbox } from "antd";
import { DownOutlined, SwapOutlined } from '@ant-design/icons';
import { SearchLocationInput } from "components";
import "./Filters.scss";

const Filter = props => {
    const {
        ageRange,
        startAge,
        setStartAge,
        endAge,
        setEndAge,
        filterUsers,
        setUserAdress,
        setSex,
        setPets,
        setBadHabits } = props;

    const DropdownMenu = (age) => {
        return (
            <Menu className="dropdown_menu">
                {ageRange.map((num) => {
                    if(age === "startAge") {
                        return ( <Menu.Item key={num} onClick={e => setStartAge(e.key)} > {num} </Menu.Item> );
                    }
                    return ( <Menu.Item key={num} onClick={e => setEndAge(e.key)} > {num} </Menu.Item> );
                })}
            </Menu>
        );
    };
    return (
        <div className="filters" >
            <Form className="filter-form"
                  name="time_related_controls"
                  initialValues={{ remember: true, }}
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
                                trigger={['click']}
                            >
                                <Button className="age-btn" > {startAge} <DownOutlined/></Button>
                            </Dropdown>
                            <div className="arrows">
                                <SwapOutlined />
                            </div>
                            <Dropdown
                                className="age__dropdowns-item"
                                overlay={DropdownMenu()}
                                placement="bottomLeft"
                                trigger={['click']}
                            >
                                <Button className="age-btn" > {endAge} <DownOutlined/></Button>
                            </Dropdown>
                        </div>
                    </div>
                </Form.Item>
            </Form>
            <Form >
                <Form.Item hasFeedback>
                    <div className="check__picker">
                        <p>Місто:</p>
                        <SearchLocationInput parentCallback={setUserAdress} onChange={() => null}  />
                    </div>
                </Form.Item>
            </Form>
            <div id="accordion">
                <div className="card border-0">
                    <div className="card-header bg-white border-0" id="headingOne">
                        <h5 className="mb-0 text-center">
                            <button className="more__options__btn" data-toggle="collapse" data-target="#collapseOne"
                                    aria-expanded="true" aria-controls="collapseOne">
                                More Options
                            </button>
                        </h5>
                    </div>

                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                        <Form >
                            <Form.Item hasFeedback>
                                <div className="check__picker">
                                    <div><p>Стать:</p></div>
                                    <div><Checkbox
                                        onChange={e => e.target.checked ? setSex(e.target.checked) : setSex(undefined)}
                                        className="check__picker-item">Чоловік</Checkbox>
                                        <Checkbox
                                            onChange={e => e.target.checked ? setSex(!e.target.checked) : setSex(undefined)}
                                            className="check__picker-item check__picker-item--female">Жінка</Checkbox>
                                    </div>
                                </div>
                            </Form.Item>
                        </Form>
                        <Form  >
                            <Form.Item hasFeedback>
                                <div className="check__picker">
                                    <div><p>Погані звички:</p></div>
                                    <div>
                                        <Checkbox
                                            onChange={e => e.target.checked ? setBadHabits(e.target.checked) : setBadHabits()}
                                            className="check__picker-item">Так</Checkbox>
                                        <Checkbox
                                            onChange={e => e.target.checked ? setBadHabits(!e.target.checked) : setBadHabits()}
                                            className="check__picker-item check__picker-item--female">Ні</Checkbox>
                                    </div>
                                </div>
                            </Form.Item>
                        </Form>
                        <Form >
                            <Form.Item hasFeedback>
                                <div className="check__picker">
                                    <div><p>Домашні тваринки:</p></div>
                                    <div><Checkbox
                                        onChange={e => e.target.checked ? setPets(e.target.checked) : setPets()}
                                        className="check__picker-item">Так</Checkbox>
                                        <Checkbox
                                            onChange={e => e.target.checked ? setPets(!e.target.checkede) : setPets()}
                                            className="check__picker-item check__picker-item--female">Ні</Checkbox>
                                    </div>
                                </div>


                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
            <div className="filter__submit">
                <button onClick={filterUsers}
                        className="submit"
                        type="primary"
                        htmltype="submit"
                >
                    OK
                </button>
            </div>

        </div>
    );
};

export default Filter;
