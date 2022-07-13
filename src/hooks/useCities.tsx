import { useState } from "react";
import CitiesService from '../services/cities';
import { CityInfo } from "../interfaces/interfaces";
import { useDispatch } from "react-redux";
import citiesAction from "../actions/citiesAction";
import debounce from 'lodash.debounce';

const useCities = (citiesToSave?: CityInfo[]) => {
    const [cities, setCities] = useState<Array<CityInfo>>([]);
    const [savedCities, setSavedCities] = useState<Array<CityInfo>>(citiesToSave || []);
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useDispatch();

    const fetchCities = (filters: any) => {
        setLoading(true)

        return CitiesService.getCities(filters)
        .then(response => {
            response.data.length ? setCities(response.data) : setCities([])
            setLoading(false)
        })
        .catch((error) => {
            setLoading(false)
            return [];
        })
    }

    const validateCityToUpdate = (cities: CityInfo[]) => {
        setLoading(true);

        if (savedCities.length === 0 || cities.length > savedCities.length) {
            const city = cities[cities.length - 1];
            
            setSavedCities(cities)
            dispatch(citiesAction(cities))
            updateCity(city, true)
        } else {
            const cityToRemove = savedCities.filter(x => !cities.includes(x));

            setSavedCities(cities)
            dispatch(citiesAction(cities))
            updateCity(cityToRemove[0], false)
        }
    }

    const updateCity = debounce((city: CityInfo, status: boolean, ) => {
        CitiesService.citiesAction({[city.geonameid]: status});
        setLoading(false);
    }, 500)

    return { cities, loading, savedCities, fetchCities, validateCityToUpdate }
}

export default useCities;