import { i18nModule } from './features/i18n/i18n.module';

import { ErrorHandlerService } from './services/error/errorHandler.service';
import { MainHeaderDirective } from './directives/mainHeader/mainHeader.directive';
import { RouterHelperProvider } from './routerHelper.provider';
import { ApiErrorHandlingService } from './services/error/apiErrorHandling.service';
import { ApiGlobalConfigService } from './services/apiGlobalConfig.service.js';
import { ApiHybridAppSeed } from './services/apiHybridAppSeed.service.js';
import { DaoLocalService } from './services/dao/local.service.js';
import { DaoNativeService } from './services/dao/native.service.js';
import { DaoServerService} from './services/dao/server.service.js';


export const commonModule = angular.module(
  'hybridAppSeed.common',
  [
    i18nModule.name,
  ]
)
  .provider('RouterHelper', RouterHelperProvider)
  .service('ErrorHandlerService', ErrorHandlerService)
  .service('ApiErrorHandlingService', ApiErrorHandlingService)
  .service('ApiGlobalConfigService', ApiGlobalConfigService)
  .service('ApiHybridAppSeed', ApiHybridAppSeed)
  .service('DaoLocalService', DaoLocalService)
  .service('DaoNativeService', DaoNativeService)
  .service('DaoServerService', DaoServerService)
  .directive('hmxMainHeader', MainHeaderDirective);
