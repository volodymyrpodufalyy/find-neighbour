import React, { useState } from "react";
import { Form, Dropdown, Menu, Button } from "antd";
import { DownOutlined, SwapOutlined } from '@ant-design/icons';
import "./Filters.scss"
const Filter = () => {
    const [startAge, setStartAge] = useState(1);
    const [endAge, setEndAge] = useState(30);

    const ageRange = [...Array(70).keys()].slice(1, 70);

    const DropdownMenu = (age) => {
        return (
            <Menu className="dropdown-menu">
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
        <div>
        <Form className="filter-form" name="time_related_controls">
            <Form.Item name="range-picker">
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
        </div>
    );
};

export default Filter;
