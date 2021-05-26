import React, { useState } from 'react';
import { Filter } from "components";
import { connect } from 'react-redux';
import { addinfoActions } from "redux/actions";

const Filters = ({ fetchUserAddInfos, results, filterAddInfosByAge, filterAddInfosBySex  }) => {
    const [startAge, setStartAge] = useState(1);
    const [endAge, setEndAge] = useState(30);
    const ageRange = [...Array(70).keys()].slice(1, 70);
   
    const filterByAge = () => {
        filterAddInfosByAge(startAge, endAge);
    };

    const filterSex = (sex) => {
        if(sex === "man"){
            filterAddInfosBySex(true);
        } else {
            filterAddInfosBySex(false);
        }
    }

    return (
        <Filter 
        usersList={results}
        startAge={startAge}
        setStartAge={setStartAge}
        endAge={endAge}
        setEndAge={setEndAge}
        ageRange={ageRange}
        filterByAge={filterByAge}
        filterSex={filterSex}
        onSetList={fetchUserAddInfos}
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

