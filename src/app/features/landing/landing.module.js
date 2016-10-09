import { LandingController } from './landing.controller.js';
import { landingRouterConfig } from './landing.route.js';

export const landingModule = angular.module(
  'hybridAppSeed.landing',
  []
)
  .config(landingRouterConfig)
  .controller('LandingController', LandingController);
