import React, { useState, useEffect } from 'react';
import { Filter } from "components";
import { connect } from 'react-redux';
import { addinfoActions } from "redux/actions";

const Filters = ({ results, filterAddInfos  }) => {
    const [startAge, setStartAge] = useState(1);
    const [endAge, setEndAge] = useState(30);
    const ageRange = [...Array(70).keys()].slice(1, 70);

    const [sex, setSex] = useState();
    const [pets, setPets] = useState();
    const [badHabits, setBadHabits] = useState();
    
    const filterUsers = () => {
        filterAddInfos(startAge, endAge, sex, pets, badHabits);
    }
    console.log(sex);

    useEffect(() => {
        filterUsers();
    }, [sex, pets, badHabits])

    return (
        <Filter 
        setBadHabits={setBadHabits}
        setPets={setPets}
        setSex={setSex}
        usersList={results}
        startAge={startAge}
        setStartAge={setStartAge}
        endAge={endAge}
        setEndAge={setEndAge}
        ageRange={ageRange}
        filterUsers={filterUsers}
        />
    )
}

export default connect(
    ({ addinfo }) => ({
        results: addinfo.results,
        isLoading: addinfo.isLoading
    }),
    addinfoActions
  )(Filters);

