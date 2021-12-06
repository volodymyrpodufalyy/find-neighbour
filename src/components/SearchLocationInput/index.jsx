import React from "react";
import AlgoliaPlaces from "algolia-places-react";

import "./SearchLocationInput.scss";

const SearchLocationInput = ({ onChange }) => {

  const handleChangeAddress = ({ suggestion }) => {
    onChange(suggestion.value)
  }

  return (
    <AlgoliaPlaces
      placeholder={"Введіть ваше місто"}
      onChange={handleChangeAddress}
    />
  );
};

export default SearchLocationInput;
