export class ApiDaoNativeService {
  constructor($q, ApiGlobalConfigService, DaoNative15Service, DaoNativeCordovaService, DaoNativeBrowserService, QueueManager) {
    'ngInject';
    this.cfg = ApiGlobalConfigService.config;
    this.$q = $q;
    this.QueueManager = QueueManager; // All 1.5 calls must go though que manager
    switch (this.cfg.nativeApp) {
    case 1: this.NativeService = DaoNativeCordovaService; break;
    case 2: this.NativeService = DaoNative15Service; break;
    default: this.NativeService = DaoNativeBrowserService; break;
    }
  }

  setter(api, key, datajs) {
    const deferred = this.$q.defer();

    this.NativeService.setter(key, datajs, function resp(response) {
      deferred.resolve(response);
    });
    return deferred.promise;
  }

  getter(api, key) {
    const deferred = this.$q.defer();

    this.NativeService.getter(key, function resp(response) {
      deferred.resolve(response);
    });
    return deferred.promise;
  }

  /* eslint-disable no-alert, no-unused-vars */
  call(queueItem) {
    if (this.cfg.nativeApp === 2) {
    // add to queue
    } else {
      // make the call
    }
  }
  /* eslint-enable */
}
