export class ApiErrorHandlingService {
  constructor($q, ApiGlobalConfigService) {
    'ngInject';

    this.GlobalConfigService = ApiGlobalConfigService;
    this.$q = $q;
  }

  /* HHN - Evaluate function
   * This funtion is responsible for checking actual erros returned from the server
   * in a generic way
   * */
  evaluate(api, response) {
    return response;
  }

  /* HHN - Validate function
   * This funtion is analyses a successful response from the server and add any functionality
   * For example SAAS is triggered after a control message is received (by a successfull data retrieval)
   * */
  validate(api, response) {
    const deferred = this.$q.defer();
    if (angular.isUndefined(response.data.header)) {
      // console.log('There is a major error, no header on the return:' + response.data);
      deferred.reject(response.data);
    } else {
      switch (response.data.header.statusCode) {
      case 'E001':
        deferred.reject(response);
        break;
      case 'W001':
        deferred.reject(response);
        break;
      default:
        deferred.resolve(response);
      }
    }

    return deferred.promise;
  }

}
