
import axios from 'axios';

const BASE_URL = 'https://api.wisey.app/api/v1';

axios.defaults.baseURL = `${BASE_URL}`;


const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};


const getToken = async () => {
  try {
    const response = await axios.get('/auth/anonymous?platform=subscriptions', {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        
    });
    
    setAuthHeader(response.data.token);
  } catch (error) {
    console.log(error);
  }
};

const getAllCourses = async () => {
  try {
    await getToken();
    const {data} = await axios.get('/core/preview-courses', {headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getCourseById = async id => {
  try {
    await getToken();
    const {data} = await axios.get(`/core/preview-courses/${id}`, {headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',}
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getAllCourses, getCourseById };