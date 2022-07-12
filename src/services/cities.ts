import { CitiesParams, PreferredCitiesPatch } from "../interfaces/interfaces";
const baseUrl: string = 'http://localhost:3030';

class CitiesService {
    static getCities(params?: CitiesParams) {
      const getCitiesUrl = new URL(`${baseUrl}/cities?`);

      if (params?.filter) getCitiesUrl.searchParams.append('filter', params.filter.toString())
      if (params?.limit) getCitiesUrl.searchParams.append('limit', params.limit.toString())
      if (params?.offset) getCitiesUrl.searchParams.append('offset', params.offset.toString())

      return fetch(getCitiesUrl)
        .then((response) => response.json())
    }

    static citiesAction(city: PreferredCitiesPatch) {
      const patchCityUrl = new URL(`${baseUrl}/preferences/cities`)

      fetch(`${patchCityUrl}`, { method: "PATCH", headers: { "Content-type":"application/json-patch+json" }, body: JSON.stringify(city)})
    }
};

export default CitiesService;