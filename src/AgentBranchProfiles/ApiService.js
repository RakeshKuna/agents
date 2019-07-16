import axios from 'axios';
import * as config from './../config/config';

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

export const getAgentBranchProfileDetails = (id,headers) => {
    const URL = config.AGENT_BRANCH_DETAIL_URL(id);
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

export const getActivity = (id,headers) => {
  const URL = config.AGENT_BRANCH_DETAIL_URL(id);
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

export const createAgentBranch = (data,id,headers) =>{
  const URL = config.AGENT_BRANCH_PROFILE_CREATE_URL(id);
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

export const editAgentBranch = (data,id,headers) =>{
  const URL = config.AGENT_BRANCH_PROFILE_EDIT_URL(id);
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

export const getfiledvalidationrules=(agentid,branchid,headers)=>{
  const URL = config.AGENT_BRANCH_FIELD_VALIDATIONS_URL(agentid,branchid);
  return axios(URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      // 'Authorization':headers.Authorization
    },
    })
    .then(response => response)
    .catch(error => {
      throw error;
    });
}

export const postvalidationrules=(data,agentid,branchid,headers)=>{
  const URL = config.AGENT_BRANCH_FIELD_VALIDATIONS_URL(agentid,branchid);
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
}

export const getRulesCount=(params,agentid,branchid,headers)=>{
  const URL = config.getRulesCount(agentid,branchid);
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
}