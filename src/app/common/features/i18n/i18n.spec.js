// Global jasmine hook to prevent errors when attempt to
// download a localization .json file in test environment.
// Here we are resetting the translate provider to a
// safe state.
// If a test needs to assert for localized texts,
// the test author is free to setup the translate provider
// on isolation by overriding its settings.
// This wont affect other tests because once the test execution
// exits, the translate provider is reset once again to
// a safe state.
// The error we get if we do not add this global hook is:

// Error: Unexpected request: GET /i18n/en-GB.json
// No more request expected

// https://github.com/PascalPrecht/angular-translate/issues/42

beforeAll(() => {
  const MODULE_NAME = 'hsbcMobileX.i18n';
  const DEFAULT_LANG = 'en-GB';
  const DEFAULT_TRANSLATIONS = {};

  function i18nSpecConfig($translateProvider) {
    $translateProvider.translations(DEFAULT_LANG, DEFAULT_TRANSLATIONS);
    $translateProvider.preferredLanguage(DEFAULT_LANG);
  }

  function i18nServiceMock() {
    return {
      loadLanguageFiles: function loadLanguageFiles() {},
      setLanguage: function setLanguage() {},
    };
  }

  /* eslint-disable */
  angular.module(MODULE_NAME, ['pascalprecht.translate'])
    .config(i18nSpecConfig)
    .service('I18nService', i18nServiceMock);
  /* eslint-enable */
});
