import axios from "axios";
import asyncEach from "async/each";
import asyncEachQueue from "async/eachSeries";

export class CancelToken {
  constructor() {
    this.token = axios.CancelToken.source();
  }

  cancel = msg => this.token.cancel(msg);

  getToken = () => this.token.token;
}

class Service {
  constructor(config = {}) {
    this.service = axios.create({
      ...config,
    });
  }

  /**
   * Returns the instance of axios
   */
  getAxiosInstance = () => this.service;

  request = ({ method = "GET", url, data = {}, config }) =>
    this.service.request({ method, url, data, ...config });

  get = (url, config = {}) => this.request({ method: "GET", url, config });

  delete = (url, config = {}) => this.request({ method: "DELETE", url, config });

  head = (url, config = {}) => this.request({ method: "HEAD", url, config });

  options = (url, config = {}) => this.request({ method: "OPTIONS", url, config });

  post = (url, data = {}, config = {}) => this.request({ method: "POST", url, data, config });

  put = (url, data = {}, config = {}) => this.request({ method: "PUT", url, data, config });

  patch = (url, data = {}, config = {}) => this.request({ method: "PATCH", url, data, config });

  requestMultiple = (asyncMethod, collection, callback, callbackOnComplete) => {
    asyncMethod(
      collection,
      (item, next) => {
        const { config } = item;
        if (!config) throw new Error("Service: missing config key in the item");
        this.request({ ...config })
          .then(response => callback(null, response, item, next))
          .catch(response => callback(true, response, item, next));
      },
      callbackOnComplete
    );
  };

  /**
   * @collection          Array of items to process
   * @callback            Callback for each request
   * @callbackOnComplete  Callback when all item processed or when error occured
   */
  requestAsync = (...rest) => {
    this.requestMultiple(asyncEach, ...rest);
  };

  /**
   * @collection          Array of items to process
   * @callback            Callback for each request
   * @callbackOnComplete  Callback when all item processed or when error occured
   */
  requestQueue = (...rest) => {
    this.requestMultiple(asyncEachQueue, ...rest);
  };

  /**
   * Returns new instance of cancel token
   */
  getCancelToken = () => new CancelToken();

  /**
   * Returns true when input response is generated by cancel request
   */
  isCancelled = res => axios.isCancel(res);
}

export default Service;