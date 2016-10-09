describe('MainHeaderDirective', function describeMainHeaderDirective() {
  let mainHeaderEl;
  let scope;

  let compile;
  let rootScope;

  beforeEach(angular.mock.module('hsbcMobileX'));

  beforeEach(inject(($compile, $rootScope) => {
    compile = $compile;
    rootScope = $rootScope;
  }));

  it('should correctly compile ', () => {
    mainHeaderEl = angular.element(
      '<hmx-main-header></hmx-main-header>'
    );

    scope = rootScope.$new();
    mainHeaderEl = compile(mainHeaderEl)(scope);
    scope.$digest();

    expect(angular.isDefined(mainHeaderEl.html())).toBe(true);
  });
});
