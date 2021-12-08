import React from "react";
import AlgoliaPlaces from "algolia-places-react";

import "./SearchLocationInput.scss";

const SearchLocationInput = ({ onChange }) => {

    const handleChangeAddress = ({ suggestion }) => {
        onChange(suggestion.value)
    }

    return (
        <AlgoliaPlaces
            placeholder={"Enter your city..."}
            onChange={handleChangeAddress}
        />
    );
};

export default SearchLocationInput;
