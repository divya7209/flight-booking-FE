import axios from 'axios';
/**
 * this is custom api call common for all components
 */
const BASE_URL = 'http://localhost:8080/api/v1';

const CustomApi = async (endpoints: string, method: string = 'GET', data: any = null, headers = {}) => {
    try {
        const response = await axios({
            url: `${BASE_URL}${endpoints}`,
            method,
            data,
            headers,
        });
        return response.data;
    } catch (error) {
        console.error('common server error:', error);
        throw error;
    }
};

export default CustomApi;