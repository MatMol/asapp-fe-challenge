import { useState } from "react";
import CitiesService from '../services/cities';
import { CityInfo } from "../interfaces/interfaces";

const useCities = () => {
    const [cities, setCities] = useState<Array<CityInfo>>([]);
    const [savedCities, setSavedCities] = useState<Array<CityInfo>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchCities = (filters: any) => {
        setLoading(true)

        return CitiesService.getCities(filters)
        .then(response => {
            response.data.length ? setCities(response.data) : setCities([])
            setLoading(false)
        })
    }

    // Note:
    // I added this method for the PATCH but I don't have a POST method to create a record for this to update it
    // I'll leave it anyway but currently I don't have a proper way of using this.
    const validateCityToUpdate = (event: any, cities: CityInfo[]) => {
        setLoading(true);
        const city = cities[cities.length - 1]; // To grab last item of array of cities to PATCH

        if (savedCities.length === 0 || cities.length > savedCities.length) {
            setSavedCities(cities)
            updateCity(city, true)
        } else {
            setSavedCities(cities)

            const cityToRemove = savedCities.filter(x => !cities.includes(x));
            updateCity(cityToRemove[0], false)
        }

        setLoading(false);
    }

    const updateCity = (city: CityInfo, status: boolean, ) => {
        CitiesService.updateCities({[city.geonameid]: status});
        setLoading(false);
    }

    return { cities, loading, fetchCities, validateCityToUpdate }
}

export default useCities;