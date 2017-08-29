angular.module('homer').directive('onlineUserListPvt', function($rootScope, UserService) {
    return {
      restrict: "E",
      replace: true,
      templateUrl: 'scripts/controllers/chat-pvt/online-user-list-pvt/online-user-list-pvt.html',
  
      controller: function($scope){
        
        $scope.users = UserService.getOnlineUsers();
        $scope.openChat = function (el){
          console.log(el);
          $scope.toUser = el;
        }
  
      }
    };
  });