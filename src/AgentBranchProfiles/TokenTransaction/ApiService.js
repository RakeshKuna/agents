import axios from 'axios';
import * as config from '../../config/config';

export const serviceProviderList = (headers) =>{
    const URL = config.SERVICE_PROVIDER_LIST;
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

export const ProductList = (headers) =>{
    const URL = config.PRODUCT_LIST;
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

export const CreateTokenExpiry = (data,agentid,branchid,headers) =>{
  const URL = config.AGENT_BRANCH_BUILD_CREATE_TOKENEXPIRY(agentid,branchid);
  return axios(URL,{
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
}

export const ListOfTokenExpiry = (params,agentid,branchid,headers) =>{
  const URL = config.AGENT_BRANCH_BUILD_CREATE_TOKENEXPIRY(agentid,branchid);
  return axios(URL,{
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
}

export const TokenExpiryDetails = (agentid,branchid,tokenexpiryid,headers) =>{
  const URL = config.AGENT_BRANCH_FETCH_TOKENEXPIRYDETAILS(agentid,branchid,tokenexpiryid);
  return axios(URL,{
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
}

export const getActivity = (agentid,branchid,tokenexpiryid,headers) => {
  const URL = config.AGENT_BRANCH_FETCH_TOKENEXPIRYDETAILS(agentid,branchid,tokenexpiryid);
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

export const EditTokenExpiryDetails = (data,agentid,branchid,tokenexpiryid,headers) =>{
  const URL = config.AGENT_BRANCH_FETCH_TOKENEXPIRYDETAILS(agentid,branchid,tokenexpiryid);
  return axios(URL,{
    method: 'PUT',
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
}