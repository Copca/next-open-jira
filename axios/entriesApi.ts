import axios from 'axios';

const entriesApi = axios.create({
	baseURL: '/api' // http://localhost:3000/api/
});

export default entriesApi;
