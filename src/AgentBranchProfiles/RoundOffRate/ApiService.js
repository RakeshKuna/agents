import axios from 'axios';
import * as config from '../../config/config';

export const CreateRateSettings = (data,agentid,branchid,headers) =>{
    const URL = config.AGENT_BRANCH_BUILD_CREATE_RATESETTINGS(agentid,branchid);
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

export const FetchRateSettings = (agentid,branchid,headers) =>{
  const URL = config.AGENT_BRANCH_BUILD_CREATE_RATESETTINGS(agentid,branchid);
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