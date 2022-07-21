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
        .catch((error) => {
          console.error('There was an issue with the request, please try again.');
          throw error
        })
    }

  static async getFavorites() {
    const patchCityUrl = new URL(`${baseUrl}/preferences/cities?limit=100&offset=0`)

    const citiesId = await fetch(`${patchCityUrl}`)
      .then((response => response.json()))
      .then((res) => res.data)
    
    if (citiesId.length > 0) {
      const citiesArray = await Promise.all(citiesId.map((cityId: number) => fetch(`${baseUrl}/cities/${cityId}`)))
      const jsons = await Promise.all(citiesArray.map(r => r.json()))
      return jsons
    } else {
      return []
    }
    
  }

  static citiesAction(city: PreferredCitiesPatch) {
    const patchCityUrl = new URL(`${baseUrl}/preferences/cities`)

    fetch(`${patchCityUrl}`, { method: "PATCH", headers: { "Content-type":"application/json-patch+json" }, body: JSON.stringify(city)})
    .catch((error) => {
      console.error('There was an issue with the request, please try again.');
      throw error
    })
  }

  static fetchAllSavedCities = async (ids: any) => {
    const res = await Promise.all(ids.map((id: number) => {
        fetch(`${baseUrl}/cities/${id}`)
        .then(response => response.json())
        .then(rp => console.log(rp))
    }))
    // console.log('res', res)
    // const jsons = await Promise.all(res.map(r => r.json()))

    return res
}
};

export default CitiesService;