export class DaoServerService {

  constructor($http, $q, ApiGlobalConfigService) {
    'ngInject';

    this.GlobalConfigService = ApiGlobalConfigService;
    this.http = $http;
    this.$q = $q;
  }

  /*
   * This function encapsulates the logic to fire a request against the server, in case it fails there will be an automatic
   * retry attempt. If the errors returned are 403 or 404, then no retry will be done, as this is a permanent error that
   * would not change on a new attempt.
   */
  callAttempt(api, params, deferred, attempt, maxAttempts, callingDAO) {
    const url = this.buildURL(api, params);

    if (callingDAO.GlobalConfigService.config.isBrowser) {
      // Call via AJAX
      callingDAO.serverCall(url, params, api)
        .then(function serverCallSuccess(successResp) {
          deferred.resolve(successResp);
        }, function serverCallError(errorResp) {
          switch (errorResp.status) {
          case 403:
          case 404:
            deferred.reject(errorResp);
            return;
          default:
            break;
          }

          if (attempt >= maxAttempts) {
            deferred.reject(errorResp);
          } else {
            const attemptIncremented = attempt + 1;
            callingDAO.callAttempt(api, params, deferred, attemptIncremented, maxAttempts, callingDAO);
          }
        });
    } else {
      // TODO:Call Via CordovaHttp
    }
  }

  /*
   * Set the parameters to be the FIRST attempt of ONE maximum connection attempts, so if the message fails the
   * deferred object will be rejected
   */
  callNoRetry() {
    const api = {};
    const params = {};
    const deferred = this.$q.defer();
    this.callAttempt(api, params, deferred, 1, 1, this);
    return deferred.promise;
  }

  /*
   * This method was created in preparation for the Mobile 1.5 native app integration, where all requests will be
   * queued to be fired with location.href
   */
  callQueue(api, params) {
    const deferred = this.$q.defer();
    const maxAttempts = this.GlobalConfigService.config.maxAttempts;
    this.callAttempt(api, params, deferred, 1, maxAttempts, this);
    return deferred.promise;
  }

  /*
   * Main entry point of the this function. Most request should use this function to contact the servers
   */
  call(api, params) {
    return this.callQueue(api, params);
  }

  /*
   * This function is the one that actually contains the http connection. This can be replaced for ajax, or cordova
   */
  serverCall(url, params, api) {
    if (api.method === 'GET') {
      return this.http.get(url);
    }

    const cfg = {
      url: url,
      data: this.buildPayload(params.data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    return this.http(cfg);
  }

  /*
   * Due to problems on how angular add javascript objects into the body/payload of the message this function
   * adds the functionality to write all parameters as plain text
   */
  buildPayload(obj) {
    const str = [];
    for (const index in obj) {
      if (obj.hasOwnProperty(index)) {
        str.push(encodeURIComponent(index) + '=' + encodeURIComponent(obj[index]));
      }
    }
    return str.join('&');
  }

  /*
   * This is used on GET requests to build the whole URL by appending the parameters onto it.
   * It might be deprecated in the future as most request should be sent as Post
   */
  buildURLParams(url, params) {
    let urlParams = url;
    const keys = Object.keys(params);

    // if (api.paramOrder!=undefined) {}

    for (const key in keys) {
      if (url.indexOf('?') !== -1) {
        urlParams = urlParams + '&' + keys[key] + '=' + params[keys[key]];
      } else {
        urlParams = urlParams + '?' + keys[key] + '=' + params[keys[key]];
      }
    }
    return urlParams;
  }

  /*
   * This function is used to build the correct server location.
   */
  buildHostURL(api) {
    const cfg = this.GlobalConfigService.config;
    let host = cfg.host;
    
    return host;
  }

  /*
   * If a full HTTP url is supplied, the functon will return it, as no changes are necessary, otherwise it will build
   * the full URL to be triggered by finding the correct host for the request and add all the parameters(if GET)
   */
  buildURL(api, params) {
    if (api.url.substring(0, 4) === 'http') {
      return api.url;
    }

    let url = '';
    const host = this.buildHostURL(api);

    if (api.method === 'GET') {
      // TODO: Set the parameter order and append it to the URL
      url = this.buildURLParams(api.url, params.data);
    } else {
      url = api.url;
    }
    return host + url;
  }

}
