export class LandingController {
  constructor($timeout, $state, ErrorHandlerService) {
    'ngInject';

    this.$timeout = $timeout;
    this.$state = $state;
    this.errHandlerService = ErrorHandlerService;
    this.activate();
  }

  activate() {
    this.activateStatusbar();
  }

  

  forwardToNextScreen($state) {
    $state.go('authentication.username');
  }

  preLogonSuccess(data) {
    if (data.domainName) {
      const timeoutDelay = 1500; // in milliseconds
      this.$timeout(this.forwardToNextScreen, timeoutDelay, true, this.$state);
    } else {
      this.showServerDownError(this.$state);
    }
  }

  preLogonError(errorData) {
    this.showServerDownError(this.$state, errorData);
  }

  showServerDownError() {
    const errorData = {
      errorMessage: 'HSBC pre-logon failed!',
    };
    const actionData = {
      label: 'Retry',
      goToState: 'landing',
    };
    this.errHandlerService.showApiErrorData(errorData, actionData);
  }

   
  activateStatusbar() {

    // TODO - manually bootstrap angular to avoid this
    /* eslint-disable */
    // document.addEventListener('deviceready', () => {
    //   this.$cordovaStatusbar.overlaysWebView(false);
    //   this.$cordovaStatusbar.styleHex('#000000');
    // }, false);
    /* eslint-enable */
  }
}
