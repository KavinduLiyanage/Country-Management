import axios from 'axios';

const httpRequests = {
    getCountriesData: () => axios.get('http://restcountries.eu/rest/v2/all'),
};

export default httpRequests;
