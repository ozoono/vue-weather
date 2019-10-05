import axios from 'axios'

export const API = axios.create({
	baseURL: 'https://api.weatherbit.io/v2.0/'
});
export const key = '40a2e65406014595a5894a8c17c5edd7';
