// PostMoretem - GenricDAO
export class ApiHybridAppSeed {

  constructor($q, ApiGlobalConfigService, ApiErrorHandlingService, DaoServerService, DaoLocalService) {
    'ngInject';

    if (ApiGlobalConfigService.config.dummy) {
      this.ServerDAO = DaoLocalService;
    } else {
      this.ServerDAO = DaoServerService;
    }

    this.$q = $q;
    this.GlobalConfigService = ApiGlobalConfigService;
    this.ErrorHandlingService = ApiErrorHandlingService;
    // this.defaultParams = { 'ver': window._ver, 'json': window._json,
    // 'locale': window._locale };
    this.defaultParams = { 'ver': '1.1', 'json': '', 'locale': 'en' };
  }

  setAPI(serviceAPIs) {
    // If more than one API is provided, all the .api values should be
    // combined to make it easier to process
    if (angular.isArray(serviceAPIs)) {
      this.API = angular.extend(serviceAPIs);
    } else {
      this.API = serviceAPIs;
    }
  }

  makeCall(apiName, requestName, params, deferred) {
    /*
     * Prepare parameters to pass down. Concatenating Request Name if
     * present with the others
     */

    let requestNameObj = {};

    if (requestName !== '') {
      requestNameObj = {requestName: requestName};
    }

    const combinedParams = {
      // method : 'post',
      data: angular.extend(requestNameObj, this.defaultParams, params),
    };

    const selectedAPI = this.API[apiName];
    const ehs = this.ErrorHandlingService;
    const self = this;

    this.ServerDAO.call(selectedAPI, combinedParams)
      .then(function serverDaoSuccess(success) {
        ehs.validate(selectedAPI, success, this)
          .then(function validateSuccess(response) {
            deferred.resolve(response);
          }, function validateError(error) {
            if (error.saasRefire) {
              const newAPIName = self.API[apiName].saasAPI;
              const newAPI = self.API[newAPIName];
              self.ServerDAO.call(newAPI, combinedParams)
                .then(function serverDaoNewSuccess(response) {
                  deferred.resolve(response);
                });
            } else {
              deferred.reject(error);
            }
          });
      }, function serverDaoError(error) {
        const result = ehs.evaluate(selectedAPI, error, this);
        deferred.reject(result);
      });
  }

  call(apiName, requestName, params) {
    const deferred = this.$q.defer();
    this.makeCall(apiName, requestName, params, deferred);
    return deferred.promise;
  }

}
