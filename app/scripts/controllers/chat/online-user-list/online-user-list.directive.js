angular.module('homer').directive('onlineUserList', function($rootScope, UserService) {
    return {
      restrict: "E",
      replace: true,
      templateUrl: 'scripts/controllers/chat/online-user-list/online-user-list.html',
  
      controller: function($scope){
        
        $scope.users = UserService.getOnlineUsers();
        $scope.openChat = function (el){
          console.log(el);
        }
  
      }
    };
  });