export interface CityInfo {
    geonameid: number;
    name: string;
    country: string;
    subcountry?: string;
};

export interface CitiesParams {
    filter: string;
    limit: number;
    offset: number;
}

export interface PreferredCitiesPatch {
    [key: string]: boolean;
};