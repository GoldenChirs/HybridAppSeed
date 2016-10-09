export class I18nService {
  constructor($translatePartialLoader, $translate) {
    'ngInject';

    this.$translatePartialLoader = $translatePartialLoader;
    this.$translate = $translate;
    this.currentLanguageCode = 'en-HK';
  }

  /**
   * @param path containing i18n json files
   */
  loadLanguageFiles(path) {
    this.$translatePartialLoader.addPart(path);
    this.$translate.refresh();
  }

  setLanguage(languageCode) {
    this.currentLanguageCode = languageCode;
    this.$translate.use(languageCode);
  }
}
