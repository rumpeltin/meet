import NProgress from 'nprogress';
import axios from 'axios';
import { mockData } from './mock-data';

/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
*/


export const extractLocations = (events) => {
  const locations = events.map((event) => event.location);
  return [...new Set(locations)];
};

const fetchTokenInfo = async (accessToken) => {
  const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`);
  return response.json();
};

const redirectToAuthUrl = async () => {
  const results = await axios.get("https://48pwfyunxc.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url");
  window.location.href = results.data.authUrl;
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  
  if (!accessToken || (await fetchTokenInfo(accessToken)).error) {
    localStorage.removeItem("access_token");
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) {
      await redirectToAuthUrl();
      return null;
    }
    return await getToken(code);
  }
  
  return accessToken;
};

export const checkToken = async (accessToken) => {
  return fetchTokenInfo(accessToken);
};

export const getEvents = async () => {
  NProgress.start();

  if (window.location.href.startsWith("http://localhost")) {
    NProgress.done();
    return mockData;
  }

  if (!navigator.onLine) {
    const data = localStorage.getItem("lastEvents");
    NProgress.done();
    return data ? JSON.parse(data).events : [];
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url = `https://48pwfyunxc.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/${token}`;
    const result = await axios.get(url);
    if (result.data) {
      const locations = extractLocations(result.data.events);
      localStorage.setItem('lastEvents', JSON.stringify(result.data));
      localStorage.setItem('locations', JSON.stringify(locations));
    }
    NProgress.done();
    return result.data.events;
  }
};

const removeQuery = () => {
  const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
  window.history.pushState({}, '', newurl);
};

const getToken = async (code) => {
  try {
    const encodedCode = encodeURIComponent(code);
    const response = await fetch(`https://48pwfyunxc.execute-api.eu-central-1.amazonaws.com/dev/api/token/${encodedCode}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const { access_token } = await response.json();
    access_token && localStorage.setItem("access_token", access_token);
    return access_token;
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};
