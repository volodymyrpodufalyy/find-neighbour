import React from "react";
import { Form, Dropdown, Menu, Button, Checkbox } from "antd";
import { DownOutlined, SwapOutlined } from '@ant-design/icons';
import "./Filters.scss";

const Filter = props => {
    const { 
        ageRange, 
        startAge, 
        setStartAge, 
        endAge, 
        setEndAge, 
        filterByAge, 
        filterSex,
        onSetList } = props;

        
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
        <Form className="filter-form" 
        name="time_related_controls" 
        initialValues={{ remember: true, }}
        onSubmit={filterByAge}
        >
            <Form.Item name="range-picker" hasFeedback>
                <div className="age-picker">
                    <p>Вік:</p>
                        <Button onClick={filterByAge} 
                        className="submit-age" 
                        type="primary" 
                        htmlType="submit"
                        >
                            <p>OK</p>
                        </Button>
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
                <p>Стать:</p>              
              <Checkbox 
              onChange={e => e.target.checked ? filterSex("man") : onSetList()}
              className="check__picker-item">Чоловік</Checkbox>
              <Checkbox 
              onChange={e => e.target.checked ? filterSex("woman") : onSetList()} 
              className="check__picker-item check__picker-item--female">Жінка</Checkbox>
              </div>
            </Form.Item>
        </Form>
        <Form  >
            <Form.Item hasFeedback>
            <div className="check__picker">
                <p>Погані звички:</p>              
                    <Checkbox className="check__picker-item">Так</Checkbox>
                    <Checkbox className="check__picker-item check__picker-item--female">Ні</Checkbox>
              </div>
            </Form.Item>
        </Form>
        <Form  >
            <Form.Item hasFeedback>
            <div className="check__picker">
                <p>Домашні тваринки:</p>              
                    <Checkbox className="check__picker-item">Так</Checkbox>
                    <Checkbox className="check__picker-item check__picker-item--female">Ні</Checkbox>
              </div>
            </Form.Item>
        </Form>
        </div>
    );
};

export default Filter;
