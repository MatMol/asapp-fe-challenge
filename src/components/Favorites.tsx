import { useSelector } from "react-redux";
import useCities from "../hooks/useCities";

function Favorites() {
    const citiesSaved: any = useSelector((state) => state);
    const { validateCityToUpdate } = useCities(citiesSaved);

    const checkCity = (city: any) => {
        let currentCities = citiesSaved.filter((item: any) => item !== city);
        validateCityToUpdate(currentCities)
    }

    return (
        <div>
            {
            citiesSaved?.length > 0 ? 
            citiesSaved?.map((city: any) => {
                return (
                    <div key={city.geonameid}>
                        <div>{city.name}</div>
                        <button onClick={(event) => checkCity(city)}>x</button>
                    </div>
                )
            })
            :
            <div>
                You have no favorites currently.
            </div>
            }
        </div>
    )
}

export default Favorites;
