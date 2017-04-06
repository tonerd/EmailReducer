App.controller('EmailController', ['$scope', function ($scope) {
  $scope.emailAddresses = [];
  $scope.filteredEmailAddresses = [];
  $scope.emailAddress = '';

  $scope.addEmailAddress = function() {
    if($scope.emailAddress.trim() !== '') {
      $scope.emailAddresses.push($scope.emailAddress);
      $scope.emailAddress = '';
    }
  }

  $scope.removeDuplicateEmailAddresses = function() {
    let hashTable = {};
    let result = [];

    for(let i = 0; i < $scope.emailAddresses.length; i++) {
      let current = $scope.emailAddresses[i].toLowerCase();
      if(hashTable[current] === undefined) {
        hashTable[current] = true;
        result.push(current);
      }
    }

    $scope.filteredEmailAddresses = result;
  }
}]);
