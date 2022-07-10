import React, { useState, useEffect } from "react";
import CitiesService from '../services/cities';
import { CitiesParams, CityInfo } from "../interfaces/interfaces";

const useCities = () => {
    const [cities, setCities] = useState<Array<CityInfo>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchCities = (filters: any) => {
        setLoading(true)

        return CitiesService.getCities(filters)
        .then(response => {
            response.data.length ? setCities(response.data) : setCities([])
            setLoading(false)
        })
    }

    return { cities, loading, fetchCities }
}

export default useCities;