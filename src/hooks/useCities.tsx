import { useState, useCallback, useEffect } from "react";
import CitiesService from '../services/cities';
import { CityInfo } from "../interfaces/interfaces";
import { useDispatch } from "react-redux";
import citiesAction from "../actions/citiesAction";
import debounce from 'lodash.debounce';
import { useSelector } from "react-redux";

const useCities = (citiesToSave?: CityInfo[]) => {
    const citiesSavedInStore: any = useSelector((state) => state);
    const [cities, setCities] = useState<any>([]);
    const [savedCities, setSavedCities] = useState<any>(citiesToSave || []);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const fetchCities = useCallback(async (filters: any) => {
        setLoading(true)
        // onCall we always retrieve cities
        const citiesResponse = await CitiesService.getCities(filters)
        .then(response => {
            return response.data
        })
        .catch((error) => {
            setLoading(false)
            return [];
        })
        // But we only retrieve favorites from the server on first load
        // so we avoid making excessive calls every time
        // This way we use the Store state of the favorites
        // And every time we re create a 'session' we use the server state
        if (!citiesSavedInStore) {
            const favorites = await CitiesService.getFavorites()
            .then((res: any) => { return res })
            setCities([citiesResponse, favorites])
            dispatch(citiesAction(favorites))  
        } else {
            setCities([citiesResponse, citiesSavedInStore])
        }

        setLoading(false)
    }, [])

    const validateCityToUpdate = (cities: CityInfo[]) => {
        setLoading(true);

        if (savedCities.length === 0 || cities.length > savedCities.length) {
            const city = cities[cities.length - 1];
            
            setSavedCities(cities)
            dispatch(citiesAction(cities))
            updateCity(city, true)
        } else {
            const cityToRemove = savedCities.filter((x: any) => !cities.includes(x));

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