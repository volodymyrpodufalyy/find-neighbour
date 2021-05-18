import React, { useState } from 'react';
import { Filter } from "components";
import userdata from "../pages/Search/usersdata.json"

const Filters = ({ onHandleList }) => {
    const [startAge, setStartAge] = useState(1);
    const [endAge, setEndAge] = useState(30);
    const ageRange = [...Array(70).keys()].slice(1, 70);

    const filterByAge = () => {
        const filteredByAge = userdata.slaves.filter(item => {
            return item.description >= startAge && item.description <= endAge
        });
        onHandleList(filteredByAge);
    };

    const filterSex = (sex) => {
        if(sex === "man"){
            const sexesMan = userdata.slaves.filter(item => item.sex === true);
            onHandleList(sexesMan);
        } else {
            const sexesFemale = userdata.slaves.filter(item => item.sex === false);
            onHandleList(sexesFemale)
        }
    }

    return (
        <Filter 
        startAge={startAge}
        setStartAge={setStartAge}
        endAge={endAge}
        setEndAge={setEndAge}
        ageRange={ageRange}
        filterByAge={filterByAge}
        onHandleList={onHandleList}
        filterSex={filterSex}
        />
    )
}

export default Filters;
