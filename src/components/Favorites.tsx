import React, { useState, useEffect } from "react";
import useCities from "../hooks/useCities";

function Favorites() {
    const { savedCities, validateCityToUpdate } = useCities();
    console.log(savedCities)
    return (
        <div className="BadgesList">
            {savedCities.map(city => {
                return <div>{city.name}</div>
            })}
        </div>
    )
}

export default Favorites;
