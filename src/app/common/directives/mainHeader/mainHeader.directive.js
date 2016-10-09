export function MainHeaderDirective() {
  'ngInject';

  const directive = {
    restrict: 'E',
    templateUrl: 'app/common/directives/mainHeader/mainHeader.html',
    scope: {
      config: '=?',
    },
  };

  return directive;
}
