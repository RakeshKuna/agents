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

  export const CreateChargeRules = (data,agentid,branchid,headers) =>{
    const URL = config.AGENT_BRANCH_CREATE_CHARGE_RULES_CREATE_URL(agentid,branchid);
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

  export const getChargeRules= (params,agentid,branchid,headers) => {
    const URL = config.AGENT_BRANCH_GET_CHARGE_RULES_FETCH_URL(agentid,branchid);
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
  };
  
  export const getChargeRulesProfile = (agentid,branchid,chargerulesid,headers) => {
    const URL = config.AGENT_BRANCH_GET_CHARGE_RULES_PROFILE_FETCH_URL(agentid,branchid,chargerulesid);
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

  export const getActivity = (agentid, branchid, chargerulesid, headers) => {
    const URL = config.AGENT_BRANCH_GET_CHARGE_RULES_PROFILE_FETCH_URL(agentid, branchid, chargerulesid);
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

  export const EditAllowedProducts = (data,agentid,branchid,chargerulesid,headers) =>{
    const URL = config.AGENT_BRANCH_CHARGE_RULES_EDIT_URL(agentid,branchid,chargerulesid);
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