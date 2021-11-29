import React, {useState, useEffect, useRef} from "react";
import "./SearchLocationInput.scss";
import AlgoliaPlaces from 'algolia-places-react';

// npm install algolia-places-react --save
// https://github.com/kontrollanten/algolia-places-react

const SearchLocationInput = ({parentCallback}) => {

    const [query, setQuery] = useState("");

    parentCallback(query)

    return (
        <AlgoliaPlaces placeholder='Введіть своє місто'
                       onChange={({
                                      query,
                                      rawAnswer,
                                      suggestion,
                                      suggestionIndex
                                  }) =>
                           setQuery(suggestion.value)}/>
    );

}


export default SearchLocationInput;

