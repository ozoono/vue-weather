import axios from 'axios'
export const http = axios.create({
	baseURL: 'http://api.apixu.com/v1/'
});
export const apiKey = 'a0ff64905d7c4632bd294338172108';