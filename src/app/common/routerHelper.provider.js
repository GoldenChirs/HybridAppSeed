export class RouterHelperProvider {
  constructor($stateProvider, $urlRouterProvider) {
    'ngInject';

    const RouterHelper = function RouterHelper($state) {
      let hasOtherwise = false;

      const configureStates = function configureStates(states, otherwisePath) {
        states.forEach(function eachState(state) {
          $stateProvider.state(state.state, state.config);
        });
        if (otherwisePath && !hasOtherwise) {
          hasOtherwise = true;
          $urlRouterProvider.otherwise(otherwisePath);
        }
      };

      const getStates = function getStates() {
        return $state.get();
      };

      return {
        configureStates: configureStates,
        getStates: getStates,
      };
    };

    /* jshint validthis:true */
    this.$get = RouterHelper;

    RouterHelper.$inject = ['$state'];
  }
}
