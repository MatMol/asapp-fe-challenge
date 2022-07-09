// El service tiene que ser bobo, tiene que ser una funcion a la que le lleguen x
// parametros y que devuelva algo esperado, el resto lo tendria que manejar
// el custom Hook.

import { CitiesParams } from "../interfaces/interfaces";
const baseUrl: string = 'http://localhost:3030';

class CitiesService {
    static getCities(params: CitiesParams) {
    const getCitiesUrl = new URL(`${baseUrl}/cities?`);
    console.log('Entro aca')
    if (params.filter) getCitiesUrl.searchParams.append('filter', params.filter.toString())
    if (params.limit) getCitiesUrl.searchParams.append('limit', params.limit.toString())
    if (params.offset) getCitiesUrl.searchParams.append('offset', params.offset.toString())

    return fetch(getCitiesUrl)
      .then((response) => response.json())
    }
};

export default CitiesService;