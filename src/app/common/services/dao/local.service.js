export class DaoLocalService {
  constructor(ApiGlobalConfigService, $http) {
    'ngInject';
    this.GlobalConfigService = ApiGlobalConfigService;
    this.http = $http;
  }
  /*
   * This Function is the same name nad parameters as Logon.Service to keep the interface correct
   */
  /* eslint-disable no-alert, no-unused-vars */
  call(api, params) {
    return this.loadFile(this.GlobalConfigService.config.dummyPath + api.localFile);
  }
  /* eslint-enable */

  loadFile(file) {
    return this.http.get(file);
  }
}
