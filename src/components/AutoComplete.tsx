import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { CitiesParams } from "../interfaces/interfaces";
import useCities from "../hooks/useCities";
import { useSelector } from "react-redux";

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';

import './AutoComplete.scss';
 
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function AutoComplete() {
  const initialFilters = {filter: '', limit: 24, offset: 0};
  const [filters, setFilters] = useState<CitiesParams>(initialFilters);
  const { cities, loading, fetchCities, validateCityToUpdate } = useCities();

  useEffect(() => {
    fetchCities(filters)
  }, [filters, fetchCities]);

  const handleInput = debounce((value: string) => {
      if (value.length > 3) {
          setFilters(prevState => {
              return {
                  filter: value, 
                  limit: prevState.limit >= 24 ? 24 : prevState.limit, 
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
            return {...filters, offset: prevState.offset + 23}
        });
    }
  };

  return (
    <section className="content">
      <div className="content-title">
          <h1>Select your favorite city!</h1>
      </div>
        {
          cities.length ?
          <>
            <div className="content-autocomplete">
              <Autocomplete
                  multiple
                  limitTags={2}
                  options={cities[0]}
                  defaultValue={cities[1]}
                  disableCloseOnSelect
                  loading={loading}
                  isOptionEqualToValue={(option, value) => option.geonameid === value.geonameid}
                  getOptionLabel={(option) => (`${option.name} (${option.country})`)}
                  filterOptions={(options) => options}
                  onChange={(event, value) => {
                    validateCityToUpdate(value)
                  }}
                  renderOption={(props, option, { selected }) => (
                    <Box component="li" {...props} style={{ padding: 0 }} key={option.geonameid}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      <div className="option">
                        <p>{option.name} <span>({option.country} - {option.subcountry})</span></p>
                      </div>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Type to filter by city name or country" 
                      onChange={e => {
                        handleInput(e.target.value)
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
              </div>
              <div className="content-action">
                <Link className="btn"to={`/favorites`}>
                  <Button variant="outlined" endIcon={<FavoriteIcon />}>
                      Go to Favorites
                  </Button>
                </Link>
              </div>
            </>
            :
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        }
    </section>
  );
};

export default AutoComplete;