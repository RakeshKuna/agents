import axios from 'axios';
import * as config from '../../config/config';

export const getAllAgentBranchProfiles = (params,id,headers) => {
    const URL = config.AGENT_BRANCH_PROFILE_URL(id);
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

export const fetchcurrencycodes = (headers) =>{
  const URL = config.CURRENCY_CODE_URL;
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

export const getAllowedProductSendRules = (params,agentid,branchid,headers) => {
  const URL = config.AGENT_BRANCH_ALLOWED_PRODUCTS_LIST_URL(agentid,branchid);
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

export const getAllowedProducts = (agentid,branchid,allowedproductsid,headers) => {
  const URL = config.AGENT_BRANCH_ALLOWED_PRODUCTS_VIEWPROFILE_URL(agentid,branchid,allowedproductsid);
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

export const getActivity = ( agentid, branchid, allowedproductsid, headers ) => {
  const URL = config.AGENT_BRANCH_ALLOWED_PRODUCTS_VIEWPROFILE_URL( agentid, branchid, allowedproductsid );
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

export const CreateAllowedProducts = (data,agentid,branchid,headers) =>{
  const URL = config.AGENT_BRANCH_ALLOWED_PRODUCTS_CREATE_URL(agentid,branchid);
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

export const EditAllowedProducts = (data,agentid,branchid,allowedproductsid,headers) =>{
  const URL = config.AGENT_BRANCH_ALLOWED_PRODUCTS_EDIT_URL(agentid,branchid,allowedproductsid);
  return axios(URL,{
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
}