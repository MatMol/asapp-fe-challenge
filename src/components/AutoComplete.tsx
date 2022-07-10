import React, { useState, useEffect } from "react";
import debounce from 'lodash.debounce';
import CitiesService from '../services/cities';
import { CitiesParams, CityInfo } from "../interfaces/interfaces";

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";
 
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function AutoComplete(initialCities: any) {
    const [cities, setCities] = useState<Array<CityInfo>>(initialCities);
    const [loading, setLoading] = useState<boolean>(false);

    const [filters, setFilters] = useState<CitiesParams>({
        filter: '',
        limit: 50,
        offset: 0
    })

    useEffect(() => {
        console.log('se llamo useEffect 2')
        setLoading(true)
        CitiesService.getCities(filters)
        .then(response => {
          setCities(response.data)
          setLoading(false)
        })
    }, [filters]);

    const onInputChange = debounce((value: string) => {
        if (value.length > 3) {
          setFilters({...filters, filter: value});
        }
    }, 500);
    
    const handleScroll = (event: any) => {
        const listboxNode = event.currentTarget;

        const position = listboxNode.scrollTop + listboxNode.clientHeight;
        if (listboxNode.scrollHeight - position <= 1) {
            setFilters(prevState => {
            return {...filters, offset: prevState.offset + 50}
            });
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
};

export default AutoComplete;