import React, { useState, useEffect } from "react";
import CitiesService from './services/cities';
import { CitiesParams, CityInfo } from "./interfaces/interfaces";
import  AutoComplete  from "./components/AutoComplete";
import './App.css';

function App() {
  const [initialCities, setInitialCities] = useState<Array<CityInfo>>([]);

  const [filters, setFilters] = useState<CitiesParams>({
    filter: '',
    limit: 50,
    offset: 0
  })
  // TODO: Create Custom Hook to handle search and filters
  
  useEffect(() => {
    CitiesService.getCities(filters)
    .then(response => {
      setInitialCities(response.data)
    })
  }, []);

  return (
   <div>
    <AutoComplete initialCities={initialCities} />
   </div>
  );
}

export default App;
