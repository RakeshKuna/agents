import axios from 'axios';
import * as config from '../../config/config';

export const getSettlementCurrencyList = (params,agentId,headers)=> {
  const URL = config.SETTLEMENT_CURRENCY_URL(agentId);
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

export const countryList = (headers) =>{
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

export const CurrencyCodesList = (headers) =>{
  const URL = config.CURRENCY_URL;
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

export const getAllAgentsProfiles = (params,headers) => {
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

export const getSettlementCurrencyProfileView = (agentid,settlementCurrencyId,headers) => {
  const URL = config.getSettlementCurrency(agentid,settlementCurrencyId);
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

export const getActivity = (agentid, settlementCurrencyId) => {
  const URL = config.getSettlementCurrency(agentid, settlementCurrencyId);
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

  export const CreateSettlementCurrency = (data,agentId,headers) => {
    const URL = config.CreateSettlementCurrency(agentId);
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

  export const EditSettlementCurrency = (data,agentid,settlementCurrencyId,headers) => {
    const URL = config.EditSettlementCurrency(agentid,settlementCurrencyId);
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