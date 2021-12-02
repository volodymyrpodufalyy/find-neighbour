import {Menu} from "antd";
import React, {useState} from "react";


const DropdownMenu = (dateType) => {
    const [day, setDay] = useState("День");
    const [month, setMonth] = useState("Місяць");
    const [monthKey, setMonthKey] = useState("");
    const [year, setYear] = useState("Рік");
    const dayRange = [...Array(33).keys()].slice(1, 32);
    const monthRange = ["Січень", "Лютий", "Березень", "Квітень", "Травень",
        "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
    const yearRange = [...Array(2020).keys()].slice(1970, 2020);


    if (dateType === "day") {
        return (
            <Menu className="dropdown-menu">
                {dayRange.map((num) => {
                    return <Menu.Item key={num} onClick={e => setDay(e.key)}>{num}</Menu.Item>
                })}
            </Menu>
        );
    } else if (dateType === "month") {
        return (
            <Menu className="dropdown-menu">
                {monthRange.map((month, index) => {
                    return <Menu.Item key={index} onClick={e => {
                        setMonth(e.domEvent.target.innerText);
                        setMonthKey(e.key);
                    }}>
                        {month}
                    </Menu.Item>
                })}
            </Menu>
        );
    } else if (dateType === "year") {
        return (
            <Menu className="dropdown-menu">
                {yearRange.map((year) => {
                    return <Menu.Item key={year} onClick={e => setYear(e.key)}>{year}</Menu.Item>
                })}
            </Menu>
        );
    }
};


export default DropdownMenu()
