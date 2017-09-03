angular.module('homer').directive('onlineUserListPvt', function ($rootScope, UserService) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'scripts/controllers/chat-pvt/online-user-list-pvt/online-user-list-pvt.html',

    controller: function ($scope, userList) {

      var x = UserService.getOnlineUsers();

      console.log(x);
      // console.log(userList);


      //var json = JSON.stringify(x);

      setTimeout(function () {
        //console.log(x);
        // var json = JSON.stringify(this.localList);
        // console.log(json);
        //   x.forEach(function (element) {
        //     // console.log(element);
        //     console.log(element.uuid);

        //     if (userList.items.length > 0) {
        //       if (userList.items.indexOf(element.uuid) == -1) {
        //         userList.items.push(element.uuid);
        //       }
        //     } else {
        //       userList.items.push(element.uuid);
        //     }

        //   }, this);

      }, 1000);

      $scope.users = x

      $scope.openChat = function (el) {
        console.log(el);
        $scope.toUser = el;
      }



    }

  };
});