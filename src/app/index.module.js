import { config } from './config';
import { indexConfig } from './index.config';
import { indexRouterConfig } from './index.route';

import { commonModule } from './common/common.module';

import { landingModule } from './features/landing/landing.module';

angular.module(
  'hybridAppSeed',
  [
  	'ngAnimate',
    'ui.router',
    'ui.router.title',
    'ngSanitize',
    'ngCordova',
    config.name,
    commonModule.name,
    landingModule.name,
  ]
)
  .config(indexConfig)
  .config(indexRouterConfig);
