angular.module('homer').directive('messageFormPvt', function() {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'scripts/controllers/chat-pvt/message-form-pvt/message-form-pvt.html',
    //  scope: {},
    
    controller: function($scope, MessageServicePvt,PubnubService){

      $scope.uuid = PubnubService.currentUser;
      $scope.messageContent = '';

      $scope.sendMessage = function(){
        //console.log($scope.toUser);
        PubnubService.pubnubInit();
      	 MessageServicePvt.sendMessage($scope.messageContent,$scope.toUser);
      	//MessageServicePvt.sendMessage($scope.messageContent);
      	$scope.messageContent = '';
      }
    }
  };
});