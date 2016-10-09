export class ErrorHandlerService {
  constructor($state) {
    'ngInject';
    this.$state = $state;
  }

  // TODO - at the moment this is very specific to authentication.. we need a generic one or move this inside module
  /**
   * Navigates to error screen in case of authentication failures.
   *
   * @param apiData - should contain errorMessage field
   * @param errorAction - OPTIONAL - needs to contain label for button and goToState as action.
   */
  showApiErrorData(apiData, errorAction) {
    this.setErrorMessage(apiData.errorMessage);
    this.setErrorAction(errorAction);
    this.$state.go('authentication.error');
  }

  getErrorMessage() {
    return this.errorMessage;
  }

  setErrorMessage(errorMsg) {
    this.errorMessage = errorMsg;
  }

  setErrorAction(errorAction) {
    this.errorAction = errorAction;
  }

  getErrorAction() {
    return this.errorAction;
  }
}
