export class ApiGlobalConfigService {
  constructor(API) {
    'ngInject';

    this.config = {
      dummy: true,
      domain: API.GLOBAL.DOMAIN,
      host: API.GLOBAL.HOST,
      maxAttempts: API.GLOBAL.MAX_ATTEMPTS,
     
    };
  }

  setConfigVar(key, value) {
    this.config[key] = value;
  }

}
