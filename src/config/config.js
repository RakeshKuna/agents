const DEPLOYMENT_CRITERIA = `dev`

export const AGENTS_URL =`http://agent-onboarding-service-snap.${DEPLOYMENT_CRITERIA}.apps.ocp.uaeexchange.com/`

export const AGENT_NEW_URL = `${AGENTS_URL}onboarding/api/v1/`;

export const BANKS_BASE_URL = `http://bank-onboarding-service-snap.${DEPLOYMENT_CRITERIA}.apps.ocp.uaeexchange.com/onboarding/api/v1/`

export const ALLOWED_PRODUCTS_RULE_URL = `${AGENTS_URL}onboarding/api/v1/agents/`;

export const PAAS_LOGIN_URL = `http://paas-home-ui.${DEPLOYMENT_CRITERIA}.apps.ocp.uaeexchange.com`;

//AgentProfileList API URLs 

//master Data API URLs
export const MASTER_DATA_BASE_URL = `${BANKS_BASE_URL}`
export const COUNTRY_URL = `${MASTER_DATA_BASE_URL}countries`
export const CURRENCY_URL = `${MASTER_DATA_BASE_URL}currencies`


//AgentProfileList API URLs
export const AGENT_PROFILE_URL = `${AGENT_NEW_URL}agents`

export const getAgentProfile = (agentId) => {
    return `${AGENT_PROFILE_URL}/agent/${agentId}`
}

export const editAgentProfile = (agentId) => {
    return `${AGENT_PROFILE_URL}/${agentId}`
}

export const AGENT_BRANCH_PROFILE_URL = (agentId) => {
    return `${AGENT_NEW_URL}agent/${agentId}/branches`
}

export const AGENT_BRANCH_DETAIL_URL = (branchId) => {
    return `${AGENT_NEW_URL}agents/branches/${branchId}`
}

export const AGENT_BRANCH_PROFILE_CREATE_URL = (agentId) => {
    return `${AGENT_NEW_URL}agents/${agentId}/agentBranches`
}

export const AGENT_BRANCH_PROFILE_EDIT_URL = (agentBranchId) => {
    return `${AGENT_NEW_URL}agents/agentBranches/${agentBranchId}`
}

export const SERVICE_PROVIDER_LIST = `${MASTER_DATA_BASE_URL}serviceproviders`

export const PRODUCT_LIST = `${MASTER_DATA_BASE_URL}productTypes`


export const AGENT_BRANCH_BUILD_CREATE_TOKENEXPIRY = (agentId, branchId) => {
    return `${AGENT_NEW_URL}agents/${agentId}/branches/${branchId}/tokenExpirations`
}

export const AGENT_BRANCH_FETCH_TOKENEXPIRYDETAILS = (agentId, branchId, tokenexpiryId) => {
    return `${AGENT_NEW_URL}agents/${agentId}/branches/${branchId}/tokenExpirations/${tokenexpiryId}`
}

export const AGENT_BRANCH_BUILD_CREATE_RATESETTINGS = (agentId, branchId) => {
    return `${AGENT_NEW_URL}agents/${agentId}/branches/${branchId}/rateSettings`
}

export const CURRENCY_CODE_URL = `${MASTER_DATA_BASE_URL}currencies`


export const AGENT_BRANCH_ALLOWED_PRODUCTS_LIST_URL = (agentId, agentBranchId) => {
    return `${ALLOWED_PRODUCTS_RULE_URL}${agentId}/branches/${agentBranchId}/allowedProductsSendRules`
}


export const AGENT_BRANCH_ALLOWED_PRODUCTS_VIEWPROFILE_URL = (agentId, agentBranchId, allowedproductsid) => {
    return `${ALLOWED_PRODUCTS_RULE_URL}${agentId}/branches/${agentBranchId}/allowedProductsSendRules/${allowedproductsid}`
}

export const AGENT_BRANCH_ALLOWED_PRODUCTS_CREATE_URL = (agentId, agentBranchId) => {
    return `${ALLOWED_PRODUCTS_RULE_URL}${agentId}/branches/${agentBranchId}/allowedProductsSendRules`

}
export const AGENT_BRANCH_ALLOWED_PRODUCTS_EDIT_URL = (agentId, agentBranchId, allowedproductsid) => {
    return `${ALLOWED_PRODUCTS_RULE_URL}${agentId}/branches/${agentBranchId}/allowedProductsSendRules/${allowedproductsid}`
}

export const AGENT_BRANCH_FIELD_VALIDATIONS_URL = (agentId, agentBranchId) => {
    return `${ALLOWED_PRODUCTS_RULE_URL}${agentId}/branches/${agentBranchId}/fieldValidations`

}

//charge rules

export const AGENT_BRANCH_CREATE_CHARGE_RULES_CREATE_URL =(agentId,agentBranchId)=>{
    return `${ALLOWED_PRODUCTS_RULE_URL}${agentId}/branches/${agentBranchId}/chargesRules`
}


export const AGENT_BRANCH_GET_CHARGE_RULES_FETCH_URL =(agentId,agentBranchId)=>{
    return `${ALLOWED_PRODUCTS_RULE_URL}${agentId}/branches/${agentBranchId}/chargesRules`
}


export const AGENT_BRANCH_CHARGE_RULES_EDIT_URL = (agentId, agentBranchId, chargerulesid) => {
    return `${ALLOWED_PRODUCTS_RULE_URL}${agentId}/branches/${agentBranchId}/chargesRules/${chargerulesid}`
}


export const AGENT_BRANCH_GET_CHARGE_RULES_PROFILE_FETCH_URL = (agentId, agentBranchId, chargerulesid) => {
    return `${ALLOWED_PRODUCTS_RULE_URL}${agentId}/branches/${agentBranchId}/chargesRules/${chargerulesid}`
}




//CHARGEPERFERNCE 


export const AGENT_BRANCH_BUILD_CREATE_RATE_CHARGE_PERFERENCES =(agentId,agentBranchId)=>{
    return `${ALLOWED_PRODUCTS_RULE_URL}${agentId}/branches/${agentBranchId}/rateChargePreferences`
}


export const AGENT_BRANCH_FETCH_RATE_CHARGE_PERFERENCES =(agentId,agentBranchId)=>{
    return `${ALLOWED_PRODUCTS_RULE_URL}${agentId}/branches/${agentBranchId}/rateChargePreferences`
}


export const AGENT_BRANCH_EDIT_RATE_CHARGE_PERFERENCES = (agentId, agentBranchId, ratechargeid) => {
    return `${ALLOWED_PRODUCTS_RULE_URL}${agentId}/branches/${agentBranchId}/rateChargePreferences/${ratechargeid}`
}


export const AGENT_BRANCH_FETCH_RATE_CHARGE_PERFERENCESDETAILS = (agentId, agentBranchId, ratechargeid) => {
    return `${ALLOWED_PRODUCTS_RULE_URL}${agentId}/branches/${agentBranchId}/rateChargePreferences/${ratechargeid}`
}






//Settlement Currency API URLS
export const SETTLEMENT_CURRENCY_URL = (agentId) => {
    return `${AGENT_NEW_URL}agents/${agentId}/settlementCurrencies`
}

export const CreateSettlementCurrency = (agentId) => {
    return `${AGENT_NEW_URL}agents/${agentId}/settlementCurrencies`
}

export const EditSettlementCurrency = (agentId, settlementCurrencyId) => {
    return `${AGENT_NEW_URL}agents/${agentId}/settlementCurrencies/${settlementCurrencyId}`
}


export const getSettlementCurrency = (agentId, settlementCurrencyId) => {
    return `${AGENT_NEW_URL}agents/${agentId}/settlementCurrencies/${settlementCurrencyId}`
}

export const PAAS_DASHBOARD_URL = `${PAAS_LOGIN_URL}/dash-board`;

// fetching rulecounts
export const getRulesCount = (agentId, agentBranchId) => {
    return `${AGENT_NEW_URL}agents/${agentId}/branches/${agentBranchId}/agentRulesCount`;
}