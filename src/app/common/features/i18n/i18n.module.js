import { i18nConfig } from './i18n.config.js';
import { I18nService } from './i18n.service.js';

export const i18nModule = angular.module(
  'hybridAppSeed.i18n',
  [
    'pascalprecht.translate',
  ]
)
  .config(i18nConfig)
  .service('I18nService', I18nService);
