export function i18nConfig($translateProvider, $translatePartialLoaderProvider) {
  'ngInject';

  $translateProvider.useLoader('$translatePartialLoader', {
    urlTemplate: '{part}/{lang}.json',
  });

  // Load common language pack by default
  $translatePartialLoaderProvider.addPart('/app/common/i18n/');

  $translateProvider
    .preferredLanguage('en-HK')
    .fallbackLanguage('en-HK')
    .useSanitizeValueStrategy('sanitize');
}
