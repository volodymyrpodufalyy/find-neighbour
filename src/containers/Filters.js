import React, {useState, useEffect} from 'react';
import {Filter} from "components";
import {connect} from 'react-redux';
import {addinfoActions} from "redux/actions";

const Filters = ({results, filterAddInfos, fetchUserAddInfos, pageSize}) => {
    const [startAge, setStartAge] = useState(1);
    const [endAge, setEndAge] = useState(30);
    const ageRange = [...Array(70).keys()].slice(1, 70);


    const [userAddress, setUserAddress] = useState();

    const [sex, setSex] = useState();
    const [pets, setPets] = useState();
    const [badHabits, setBadHabits] = useState();

    const filterUsers = () => {
        filterAddInfos(startAge, endAge, userAddress, sex, pets, badHabits);
    }

    useEffect(() => {
        fetchUserAddInfos(1, pageSize)
        filterUsers();
    }, [])

    useEffect(() => {
        filterUsers();
    }, [sex, pets, badHabits, userAddress])

    return (
        <Filter
            sex={sex}
            pets={pets}
            badHabits={badHabits}
            setUserAddress={setUserAddress}
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
    ({addinfo}) => ({
        results: addinfo.results,
        isLoading: addinfo.isLoading,
        pageSize: addinfo.pageSize,
    }),
    addinfoActions
)(Filters);

