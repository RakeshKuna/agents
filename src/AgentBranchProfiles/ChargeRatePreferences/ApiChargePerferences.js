import axios from 'axios';
import * as config from '../../config/config';

export const serviceProviderList = (headers) => {
  const URL = config.SERVICE_PROVIDER_LIST;
  return axios.get(URL, {
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

export const fetchcurrencycodes = (headers) => {
  const URL = config.CURRENCY_CODE_URL;
  return axios.get(URL, {
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

export const ProductList = (headers) => {
  const URL = config.PRODUCT_LIST;
  return axios.get(URL, {
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

export const CreateRateChargePerferences = (data, agentid, branchid,headers) => {
  const URL = config.AGENT_BRANCH_BUILD_CREATE_RATE_CHARGE_PERFERENCES(agentid, branchid);
  return axios(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      // 'Authorization':headers.Authorization
    },
    data: data
  })
    .then(response => response)
    .catch(error => {
      throw error;
    });
}

export const ListOfRateChargePerferences = (params, agentid, branchid,headers) => {
  const URL = config.AGENT_BRANCH_FETCH_RATE_CHARGE_PERFERENCES(agentid, branchid);
  return axios(URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      // 'Authorization':headers.Authorization
    },
    params: params
  })
    .then(response => response)
    .catch(error => {
      throw error;
    });
}

export const RateChargePerferencesDetails = (agentid, branchid, ratechargeid,headers) => {
  const URL = config.AGENT_BRANCH_FETCH_RATE_CHARGE_PERFERENCESDETAILS(agentid, branchid, ratechargeid);
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
}

export const getActivity = (agentid, branchid, ratechargeid, headers) => {
  const URL = config.AGENT_BRANCH_FETCH_RATE_CHARGE_PERFERENCESDETAILS(agentid, branchid, ratechargeid);
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

export const EditRateChargePerferencesDetails = (data, agentid, branchid, ratechargeid,headers) => {
  const URL = config.AGENT_BRANCH_EDIT_RATE_CHARGE_PERFERENCES(agentid, branchid, ratechargeid);
  return axios(URL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      // 'Authorization':headers.Authorization
    },
    data: data
  })
    .then(response => response)
    .catch(error => {
      throw error;
    });
}