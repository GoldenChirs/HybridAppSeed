export function landingRouterConfig($stateProvider) {
  'ngInject';
  $stateProvider
    .state('landing', {
      url: '/landing',
      templateUrl: 'app/features/landing/landing.html',
      controller: 'LandingController',
      controllerAs: 'landing',
    });
}
