export const throwErrorType = error =>{
    if(error.hasOwnProperty('response')){
        if(error.response!=undefined){
            switch (error.response.status){
                case 400:
                    if(error.response.data.hasOwnProperty('error')){
                        return ({status:400,message:error.response.data.error});;
                    }
                    else{
                        return ({status:404,message:'404 page not found!'});
                    }
                break;
                case 404:
                    if(error.response.data.hasOwnProperty('error')){
                        return ({status:404,message:error.response.data.error});;
                    }
                    else{
                        return ({status:404,message:'404 page not found!'});
                    }
                break;
                case 401:
                    return ({status:401,message:error.response.data.error});
                break;
                case 403:
                    return ({status:403,message:error.response.data.error});
                break;
                case 500:
                    return ({status:500,message:'Internal server Error'});
                break;
                case 503:
                    return ({status:503,message:'OOPS! Something went wrong. Please try to refresh the page'});
                break;
            }
        } 
        else{
            return ({status:503,message:'OOPS! Something went wrong. Please try to refresh the page'});
        }
}}