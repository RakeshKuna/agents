
HTTP client wrapper, axios module is used

Axios is a Promise-based HTTP client for JavaScript which can be used in front-end application and in Node.js backend for asynchronous HTTP request to REST endpoints and perform CRUD operations.

Key features
* Make XMLHttpRequests from the browser
* Make http requests from node.js
* Supports the Promise API
* Intercept request and response
* Transform request and response data
* Cancel requests
* Automatic transforms for JSON data
* Client side support for protecting against XSRF

For more details [Axios](https://github.com/axios/axios)

# Instance
```js
import { ServiceHandler } from 'finablr-ui';

const Service = new ServiceHandler({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});
```


# Request Methods
**Service.request(config)**

**Service.get(url, config)**

**Service.post(url, data, config)**

**Service.put(url, data, config)**

**Service.patch(url, data, config)**

**Service.delete(url, config)**

**Service.head(url, config)**

**Service.options(url, config)**

### Usage
```js
import { ServiceHandler } from 'finablr-ui';
const Service = new ServiceHandler();

Service.get(url, config)
  .then(successCallback)
  .catch(errorCallback);

Service.post(url, data, config)
  .then(successCallback)
  .catch(errorCallback);
 ```

# Helper Utils
**Service.requestAsync(collection, callback, callbackOnComplete)**
* Calles the HTTP request to each ```item``` in the collection, in parallel
  * collection => array of item, config key is mandatory to send requests and it will contians the request options
  * callback => callback function on each request success/failure, callback function will be called with (error, response, item, next)
    * error will be true, when there is a error in request
    * response will be error/success response
    * item will be the collection item of the request
    * next should be called inside the callback to proceed the next function or send error 
      * calling next with string argument will call the callbackOnComplete immediately if any error. ex, ```next("Error in process") or next(null)```
  * callbackOnComplete => callback function on success/error of the collection

**Service.requestQueue(collection, callback, callbackOnComplete)**
* Calles the HTTP request to each ```item``` in the collection but one request at a time.
  * collection => array of item, config key is mandatory and it should be  in the format of config params.
  * callback => callback function on each request success/failure, callback function will be called with (error, response, item, next)
    * error will be true, when there is a error in request
    * response will be error/success response
    * item will be the collection item of the request
    * next should be called inside the callback to proceed the next function or send error 
      * calling next with string argument will terminate the request ex, ```next("Error in process") ```
  * callbackOnComplete => callback function on success/error of the collection

### Usage
```js
import { ServiceHandler } from 'finablr-ui';
const Service = new ServiceHandler();

const collection = [
    {
      id: 1,
      config: {
        url,
        method: "GET"
      } 
    },
    {
      id: 2,
      config: {
        url,
        method: "GET"
      } 
    },    
]
Service.requestAsync(collection, (error, response, item, next) =>{
    if (error) {
            console.log("Error occured in the progress")
    } else {
        console.log("Successfully done")
    }
    next();
});
Service.requestQueue(collection, (error, response, item, next) =>{
    if (error) {
            console.log("Error occured in the progress")
    } else {
        console.log("Successfully done")
    }
    next();
});
 ```
## Interceptors

Used to intercept requests or responses before they are handled by `then` or `catch`.

```js
import { ServiceHandler } from 'finablr-ui';
const Service = new ServiceHandler();

// Add a request interceptor
Service.getAxiosInstance().interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
Service.getAxiosInstance().interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
```

Remove an interceptor

```js
const myInterceptor = Service.getAxiosInstance().interceptors.request.use(function () {/*...*/});
Service.getAxiosInstance().interceptors.request.eject(myInterceptor);
```

# Cancel Request
This method is used to cancel the on going request.

### Usage
```js
import { ServiceHandler } from 'finablr-ui';
const Service = new ServiceHandler();
const cancelToken = Service.getCancelToken();
Service.get(url, {cancelToken: cancelToken.getToken()});
cancelToken.cancel("Operation cancelled by user")
```

## Request Config

These are the available config options for making requests. Only the `url` is required. Requests will default to `GET` if `method` is not specified.

```js
{
  // `url` is the server URL that will be used for the request
  url: '/user',

  // `method` is the request method to be used when making the request
  method: 'get', // default

  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance to pass relative URLs
  // to methods of that instance.
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` allows changes to the request data before it is sent to the server
  // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
  // FormData or Stream
  // You may modify the headers object.
  transformRequest: [function (data, headers) {
    // To transform the data, as per the need

    return data;
  }],

  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: [function (data) {
    // To transform the data, as per the need

    return data;
  }],

  // `headers` are custom headers to be sent
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params: {
    ID: 12345
  },

  // `paramsSerializer` is an optional function in charge of serializing `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function (params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream, Buffer
  data: {
    firstName: 'Fred'
  },

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 1000, // default is `0` (no timeout)

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: false, // default

  // `adapter` allows custom handling of requests which makes testing easier.
  // Return a promise and supply a valid response (see lib/adapters/README.md).
  adapter: function (config) {
    /* ... */
  },

  // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
  // This will set an `Authorization` header, overwriting any existing
  // `Authorization` custom headers you have set using `headers`.
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` indicates the type of data that the server will respond with
  // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // `responseEncoding` indicates encoding to use for decoding responses
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default

  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // `onUploadProgress` allows handling of progress events for uploads
  onUploadProgress: function (progressEvent) {
    // The native progress event to identify how much the client uploaded
  },

  // `onDownloadProgress` allows handling of progress events for downloads
  onDownloadProgress: function (progressEvent) {
    // The native progress event to identify how much the client downloaded
  },

  // `maxContentLength` defines the max size of the http response content in bytes allowed
  maxContentLength: 2000,

  // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `maxRedirects` defines the maximum number of redirects to follow in node.js.
  // If set to 0, no redirects will be followed.
  maxRedirects: 5, // default

  // `socketPath` defines a UNIX Socket to be used in node.js.
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // Only either `socketPath` or `proxy` can be specified.
  // If both are specified, `socketPath` is used.
  socketPath: null, // default

  // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
  // and https requests, respectively, in node.js. This allows options to be added like
  // `keepAlive` that are not enabled by default.
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' defines the hostname and port of the proxy server.
  // You can also define your proxy using the conventional `http_proxy` and
  // `https_proxy` environment variables. If you are using environment variables
  // for your proxy configuration, you can also define a `no_proxy` environment
  // variable as a comma-separated list of domains that should not be proxied.
  // Use `false` to disable proxies, ignoring environment variables.
  // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and
  // supplies credentials.
  // This will set an `Proxy-Authorization` header, overwriting any existing
  // `Proxy-Authorization` custom headers you have set using `headers`.
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` specifies a cancel token that can be used to cancel the request
  // (see Cancellation section below for details)
  cancelToken: new CancelToken(function (cancel) {
  })
}
```

## Response Schema

The response for a request contains the following information.

```js
{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  // `headers` the headers that the server responded with
  // All header names are lower cased
  headers: {},

  // `config` is the config that was provided for the request
  config: {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request: {}
}
```
