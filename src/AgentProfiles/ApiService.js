import axios from 'axios';
import * as config from './../config/config';

export const getAllAgentProfiles = (params,headers) => {
  const URL = config.AGENT_PROFILE_URL;
  return axios(URL, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        // 'Authorization':headers.Authorization
    },
    params:params
    })
    .then(response => response)
    .catch(error => {
      throw error;
    });
};

export const getAgentProfile = (agentid,headers) => {
    const URL = config.getAgentProfile(agentid);
    return axios(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        // 'Authorization':headers.Authorization
      }
      })
      .then(response => response)
      .catch(error => {
        throw error;
      });
};

export const getActivity = (agentid,headers) => {
  const URL = config.getAgentProfile(agentid);
  return axios(URL+'/activities', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      // 'Authorization':headers.Authorization
    }
    })
    .then(response => response)
    .catch(error => {
      throw error;
    });
};

export const fetchCountryList = (headers) =>{
  const URL = config.COUNTRY_URL;
  return axios.get(URL,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      // 'authorization':headers.Authorization
    }
  })
  .then(response => response)
  .catch(error => {
    throw error;
  });
}

export const createAgentProfile = (data,headers) => {
  const URL = config.AGENT_PROFILE_URL;
  return axios(URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        // 'Authorization':headers.Authorization
    },
    data:data
    })
    .then(response => response)
    .catch(error => {
      throw error;
    });
};

export const editAgentProfile = (data,id,headers) => {
  const URL = config.editAgentProfile(id);
  return axios(URL, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        // 'Authorization':headers.Authorization
    },
    data:data
    })
    .then(response => response)
    .catch(error => {
      throw error;
    });
};