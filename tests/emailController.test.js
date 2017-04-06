const assert = chai.assert;
const expect = chai.expect;

describe('EmailController', function(){
  const scope = {};
  var controller;

	beforeEach(module('EmailApp'));

  beforeEach(inject(function ($controller) {
    controller = $controller('EmailController', {$scope: scope});
  }));

  describe('addEmailAddress()', function(){
    it('should add email addresses', inject(function($controller){
      scope.emailAddress = 'test@test.com';
      scope.addEmailAddress();
      expect(scope.emailAddresses).to.deep.equal(['test@test.com']);
    }));

    it('should not add blank email addresses', inject(function($controller){
      scope.emailAddress = '';
      scope.addEmailAddress();
      scope.emailAddress = '  ';
      scope.addEmailAddress();
      expect(scope.emailAddresses).to.deep.equal([]);
    }));
  });

	describe('removeDuplicateEmailAddresses()', function(){
		it('should remove duplicate email addresses', inject(function($controller){
      scope.emailAddresses = ['test@test.com', 'sample@sample.com', 'test@test.com', 'someone@somewhere.com', 'someone@somewhere.com', 'person@people.com'];
      scope.removeDuplicateEmailAddresses();
      expect(scope.filteredEmailAddresses).to.deep.equal(['test@test.com', 'sample@sample.com', 'someone@somewhere.com', 'person@people.com']);
		}));

    it('should handle not having email addresses', inject(function($controller){
      scope.removeDuplicateEmailAddresses();
      expect(scope.filteredEmailAddresses).to.deep.equal([]);
		}));

    it('should return in less than 1 second for large data sets', inject(function($controller){
      for(let i = 0; i < 50000; i++) {
          scope.emailAddresses.push('test' + i + '@test.com');
          scope.emailAddresses.push('test' + i + '@test.com');
      }

      shuffle(scope.emailAddresses);
      expect(scope.emailAddresses).to.have.lengthOf(100000);
      let start = Date.now();
      scope.removeDuplicateEmailAddresses();
      let end = Date.now();
      expect(end - start).to.be.below(1000);
      expect(scope.filteredEmailAddresses).to.have.lengthOf(50000);
		}));
	});
});

function shuffle(array) {
  let currentIndex = array.length;

  while (0 !== currentIndex) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    let temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return array;
}
