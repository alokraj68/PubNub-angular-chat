angular.module('homer').directive('messageForm', function() {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'scripts/controllers/chat/message-form/message-form.html',
    scope: {},
    
    controller: function($scope, PubnubService, MessageService){

      $scope.uuid = PubnubService.currentUser;
      $scope.messageContent = '';

      $scope.sendMessage = function(){
      	MessageService.sendMessage($scope.messageContent);
      	$scope.messageContent = '';
      }
    }
  };
});