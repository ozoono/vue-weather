import axios from 'axios'
export const http = axios.create({
	baseURL: 'http://api.apixu.com/v1/'
});
export const apiKey = '<YOUR_API_KEY>';
