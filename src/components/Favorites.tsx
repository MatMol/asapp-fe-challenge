import { useSelector } from "react-redux";
import useCities from "../hooks/useCities";
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import DeleteIcon from '@mui/icons-material/Delete';

import './Favorites.scss';

function Favorites() {
    const citiesSaved: any = useSelector((state) => state);
    const { validateCityToUpdate } = useCities(citiesSaved);

    const checkCity = (city: any) => {
        let currentCities = citiesSaved.filter((item: any) => item !== city);
        validateCityToUpdate(currentCities)
    }

    return (
        <section className="favorite">
            <h1>
                Your favorite Cities.
            </h1>
            <div className="favorite-container">
                {
                    citiesSaved?.length > 0 ? 
                    citiesSaved?.map((city: any) => {
                        return (
                            <Box key={city.geonameid} sx={{ minWidth: 240, maxWidth: 240, margin: 0.5}}>
                                <Card style={{ position: "relative" }}>
                                    <CardContent>
                                        <span style={{ position: "absolute", top: 80, left: 190 }} onClick={(e) => checkCity(city)}>
                                            <IconButton aria-label="delete" size="large">
                                                <DeleteIcon />
                                            </IconButton>
                                        </span>
                                        <Typography style={{ marginBottom: 5, maxWidth: 208, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                                            Country: <b>{city.country}</b>
                                        </Typography>
                                        <Typography style={{ marginBottom: 5, maxWidth: 208, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                                            State: <b>{city.subcountry}</b>
                                        </Typography>
                                        <Typography style={{ marginBottom: 5, maxWidth: 208, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                                            City: <b>{city.name}</b>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        )
                    })
                    :
                    <div className="favorite-empty">
                        <h3>
                            You currently have no favorites.
                        </h3>
                    </div>
                }
            </div>
            {
                <div className="favorite-action">
                    <Link className="btn"to={`/`}>
                        <Button variant="outlined" endIcon={<KeyboardReturnIcon />}>
                            Go to back
                        </Button>
                    </Link>
                </div>
            }
        </section>
    )
}

export default Favorites;
