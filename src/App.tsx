import React, { useState, useEffect } from "react";
import debounce from 'lodash.debounce'
import './App.css';

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";

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
  const [limit, setLimit] = useState<number>(100);

  useEffect(() => {
    setLoading(true)
    fetch(`http://localhost:3030/cities?limit=${limit}`)
      .then((response) => response.json())
      .then((res) => {
        setLoading(false)
        setCities(res.data)
      });
  }, []);

  useEffect(() => {
    if (filter !== '') {
      setLoading(true)
      fetch(`http://localhost:3030/cities?limit=100&filter=${filter}`)
      .then((response) => response.json())
      .then((res) => {
        setLoading(false)
        setCities(res.data)
      });
    }
  }, [filter]);

  useEffect(() => {
      setLoading(true)
      fetch(`http://localhost:3030/cities?limit=${limit}`)
      .then((response) => response.json())
      .then((res) => {
        setLoading(false)
        setCities(res.data)
      });
  }, [limit]);

  const onInputChange = debounce((value: String) => {
    if (value.length > 3) setFilter(value)
  }, 600);

  const handleScroll = (event: any) => {
    const listboxNode = event.currentTarget;

    const position = listboxNode.scrollTop + listboxNode.clientHeight;
    if (listboxNode.scrollHeight - position <= 1) {
      setLimit(limit + 50);
    }
  };

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={cities}
      disableCloseOnSelect
      loading={loading}
      isOptionEqualToValue={(option, value) => option.geonameid === value.geonameid}
      getOptionLabel={(option) => option.name}
      filterOptions={(options) => options}
      renderOption={(props, option, { selected }) => (
        <Box component="li" {...props} key={option.geonameid}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
          {/* TODO Add country and SubCountry */}
        </Box>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Type to filter by city name or country" 
          onChange={e => {
            onInputChange(e.target.value)
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}  
        />
      )}
      ListboxProps={{
        onScroll: handleScroll
      }}
    />
  );
}

export default App;
