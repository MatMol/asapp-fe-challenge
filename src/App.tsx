import React, { useState, useEffect } from "react";
import './App.css';

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface CityInfo {
  geonameid: number;
  name: string;
  country: string;
  subcountry?: string;
};

function App() {
  const [cities, setCities] = useState<Array<CityInfo>>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const [filter, setFilter] = useState<String>('');

  useEffect(() => {
    setLoading(true)
    fetch("http://localhost:3030/cities?limit=100")
      .then((response) => response.json())
      .then((res) => {
        setLoading(false)
        setCities(res.data)
      });
  }, []);

  useEffect(() => {
    if (filter != '') {
      setLoading(true)
      fetch(`http://localhost:3030/cities?limit=100&filter=${filter}`)
      .then((response) => response.json())
      .then((res) => {
        setLoading(false)
        setCities(res.data)
      });
    }
  }, [filter]);

  const onInputChange = (value: String) => {
    setFilter(value)
  }

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={cities}
      disableCloseOnSelect
      loading={loading}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props} key={option.geonameid} >
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
          {/* TODO Add country and SubCountry */}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Type to filter by city name or country" 
          onChange={e => {
            const { value } = e.target;
            onInputChange(value)
          }}/>
      )}
    />
  );
}

export default App;
