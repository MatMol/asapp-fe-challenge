import React, { useState, useEffect } from "react";
import debounce from 'lodash.debounce';
import { CitiesParams } from "../interfaces/interfaces";
import useCities from "../hooks/useCities";

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";
 
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function AutoComplete() {
    const initialFilters = {filter: '', limit: 25, offset: 0};
    const { cities, loading, fetchCities } = useCities();
    const [filters, setFilters] = useState<CitiesParams>(initialFilters);

    useEffect(() => {
        fetchCities(filters)
    }, [filters]);

    const onInputChange = debounce((value: string) => {
        if (value.length > 3) {
            setFilters(prevState => {
                return {
                    filter: value, 
                    limit: prevState.limit >= 25 ? 25 : prevState.limit, 
                    offset: prevState.offset >= 0 ? 0 : prevState.offset 
                }
            });
        } else if (value.length === 0) {
            setFilters(initialFilters)
        }
    }, 500);
    
    const handleScroll = (event: any) => {
      const listboxNode = event.currentTarget;
      const position = listboxNode.scrollTop + listboxNode.clientHeight;
      if (listboxNode.scrollHeight - position === 0) {
          setFilters(prevState => {
              return {...filters, offset: prevState.offset + 24}
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
          getOptionLabel={(option) => (`${option.name} (${option.country})`)}
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
              <br>
              </br>
              {option.country} - {option.subcountry}
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