import axios from 'axios';

const url = 'https://api.covid19api.com/';

export const fetchCountriesSummary = async () => {
    try {
        const data = await axios.get(`${url}/summary`);
        return data.data;
    } catch (error) {
        console.log(error)
    }
}