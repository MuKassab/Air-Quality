/* eslint-disable consistent-return */
/* eslint-disable default-param-last */
import _ from 'lodash';
import axios from 'axios';

export default class Requester {
  /**
   * Initializes a new instance of the Requester class.
   *
   * @param {string} url - The base URL for the axios instance.
   * @param {Object} headers - The default headers to be sent with requests.
   * @param {number} [timeout=10000] - The request timeout in milliseconds.
   *
   *
   * @returns {Requester} - The initialized Requester instance.
   */
  constructor(url, headers, timeout = 10000) {
    this.timeout = timeout;
    this.instance = axios.create({
      baseURL: url,
      timeout: this.timeout,
      headers,
    });
    this.activeURL = '';
  }

  /**
   * Sets the active URL to the given URL and returns the Requester instance.
   *
   * @param {string} url - The URL to set as the active URL.
   *
   * @returns {Requester} - The Requester instance.
   */
  on(url) {
    this.activeURL = url;
    return this;
  }

  /**
   * Appends a query parameter to the active URL.
   *
   * @param {string} paramName - The name of the query parameter.
   * @param {*} paramValue - The value of the query parameter. If falsy, the method returns without altering the URL.
   *
   * @returns {Requester} - The Requester instance.
   */

  injectQueryParam(paramName, paramValue) {
    if (!paramValue) { return this; }
    const op = this.isFirstParam(this.activeURL) ? '?' : '&';
    this.activeURL += `${op}${paramName}=${paramValue}`;

    return this;
  }

  /**
   * Creates a request with the given request type, payload and options.
   *
   * @param {string} requestType - The request type (e.g. 'GET', 'POST', 'PUT', 'DELETE', 'PATCH').
   * @param {*} payload - The payload to be sent with the request.
   * @param {Object} headers - The headers to be sent with the request.
   * @param {number} timeout - The timeout for the request in milliseconds.
   * @param {Object} options - Additional options to be passed to the `axios.request` method.
   *
   * @returns {Promise<AxiosResponse>} - The response of the request.
   */
  createRequest(requestType, payload, headers = {}, timeout, options = {}) {
    if (!this.activeURL) { throw new Error('No active URL set'); }

    return this.instance.request({
      method: requestType,
      url: this.activeURL,
      data: payload,
      headers,
      timeout: timeout || this.timeout,
      ...options,
    });
  }

  /**
   * Creates a GET request with the given payload, headers and options.
   *
   * @param {*} payload - The payload to be sent with the request.
   * @param {Object} headers - The headers to be sent with the request.
   * @param {number} timeout - The timeout for the request in milliseconds.
   * @param {Object} options - Additional options to be passed to the `axios.request` method.
   *
   * @returns {Promise<AxiosResponse>} - The response of the request.
   */
  get(payload, headers = {}, timeout, options = {}) {
    return this.createRequest('GET', payload, headers, timeout, options);
  }

  /**
   * Creates a POST request with the given payload, headers and options.
   *
   * @param {*} payload - The payload to be sent with the request.
   * @param {Object} headers - The headers to be sent with the request.
   * @param {number} timeout - The timeout for the request in milliseconds.
   * @param {Object} options - Additional options to be passed to the `axios.request` method.
   *
   * @returns {Promise<AxiosResponse>} - The response of the request.
   */
  post(payload, headers = {}, timeout, options = {}) {
    return this.createRequest('POST', payload, headers, timeout, options);
  }

  /**
   * Creates a PUT request with the given payload, headers and options.
   *
   * @param {*} payload - The payload to be sent with the request.
   * @param {Object} headers - The headers to be sent with the request.
   * @param {number} timeout - The timeout for the request in milliseconds.
   * @param {Object} options - Additional options to be passed to the `axios.request` method.
   *
   * @returns {Promise<AxiosResponse>} - The response of the request.
   */
  put(payload, headers = {}, timeout, options = {}) {
    return this.createRequest('PUT', payload, headers, timeout, options);
  }

  /**
   * Creates a DELETE request with the given payload, headers and options.
   *
   * @param {*} payload - The payload to be sent with the request.
   * @param {Object} headers - The headers to be sent with the request.
   * @param {number} timeout - The timeout for the request in milliseconds.
   * @param {Object} options - Additional options to be passed to the `axios.request` method.
   *
   * @returns {Promise<AxiosResponse>} - The response of the request.
   */

  delete(payload, headers = {}, timeout, options = {}) {
    return this.createRequest('DELETE', payload, headers, timeout, options);
  }

  /**
   * Creates a PATCH request with the given payload, headers and options.
   *
   * @param {*} payload - The payload to be sent with the request.
   * @param {Object} headers - The headers to be sent with the request.
   * @param {number} timeout - The timeout for the request in milliseconds.
   * @param {Object} options - Additional options to be passed to the `axios.request` method.
   *
   * @returns {Promise<AxiosResponse>} - The response of the request.
   */
  patch(payload, headers = {}, timeout, options = {}) {
    return this.createRequest('PATCH', payload, headers, timeout, options);
  }

  /**
   * Checks if the given URL is the first query parameter.
   *
   * @param {string} url - The URL to check.
   *
   * @returns {boolean} - True if the given URL is the first query parameter, false otherwise.
   */
  // eslint-disable-next-line class-methods-use-this
  isFirstParam(url) {
    return _.isNil(url) || url.indexOf('?') === -1;
  }
}
