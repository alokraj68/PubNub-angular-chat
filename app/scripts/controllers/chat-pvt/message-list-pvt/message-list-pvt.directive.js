angular.module('homer').directive('messageListPvt', function ($rootScope, $anchorScroll, MessageServicePvt) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'scripts/controllers/chat-pvt/message-list-pvt/message-list-pvt.html',

    link: function (scope, element, attrs, ctrl) {
      var element = angular.element(element)

      var scrollToBottom = function () {
        element.scrollTop(element.prop('scrollHeight'));
      };

      var hasScrollReachedBottom = function () {
        return element.scrollTop() + element.innerHeight() >= element.prop('scrollHeight')
      };

      var hasScrollReachedTop = function () {
        return element.scrollTop() === 0;
      };

      var fetchPreviousMessages = function () {

        console.log('Loading previous messages...', 'success');

        var currentMessage = MessageServicePvt.getMessages()[0].uuid

        MessageServicePvt.fetchPreviousMessages().then(function (m) {

          // Scroll to the previous message 
          $anchorScroll(currentMessage);

        });

      };

      var watchScroll = function () {

        if (hasScrollReachedTop()) {

          if (MessageServicePvt.messagesAllFetched()) {
            console.log('All the messages have been loaded', 'grimace');
          } else {
            fetchPreviousMessages();
          }
        }

        // Update the autoScrollDown value 
        scope.autoScrollDown = hasScrollReachedBottom()

      };

      var init = function () {

        // Scroll down when the list is populated
        var unregister = $rootScope.$on('factory:message:populated', function () {
          // Defer the call of scrollToBottom is useful to ensure the DOM elements have been loaded
          _.defer(scrollToBottom);
          unregister();

        });

        // Scroll down when new message
        MessageServicePvt.subscribeNewMessage(function () {
          if (scope.autoScrollDown) {
            scrollToBottom()
          }
        });

        // Watch the scroll and trigger actions
        element.bind("scroll", _.debounce(watchScroll, 250));
      };

      init();

    },
    controller: function ($scope, userList) {
      // Auto scroll down is acticated when first loaded
      $scope.autoScrollDown = true;
      var x = MessageServicePvt.getMessages();
      $scope.messages = x;
      setTimeout(function () {
        //var json = JSON.stringify(x);
        // x.forEach(function (LocalArray) {
        //   console.log(LocalArray.sender_uuid);
        //   //console.log("userlist", userList);
        //   if (userList.items.length > 0) {
        //     userList.items.forEach(function (MainArray) {
        //       console.log("Main array",MainArray);
        //       if(MainArray.uuid){
        //       console.log("main array uuid",MainArray.uuid);
        //       console.log(MainArray.uuid,LocalArray.sender_uuid);
        //       console.log(MainArray.uuid.indexOf(LocalArray.sender_uuid));
        //       if (MainArray.uuid.indexOf(LocalArray.sender_uuid) == -1) {

        //         var obj = {
        //           'uuid': LocalArray.sender_uuid
        //         };
        //         console.log("hi");
        //         console.log(obj);
        //         userList.items.push(obj);
        //       }
        //     }
        //     }, this);
        //   } else {
        //     var obj = {
        //       'uuid': LocalArray.sender_uuid
        //     };
        //     userList.items.push(obj);
        //   }

        // }, this);
        console.log(userList);
        console.log(x);
        var localarray = new Array();
        x.forEach(function (element) {
          console.log(element.sender_uuid);
          if (localarray && localarray.length > 0) {
            console.log(JSON.stringify(localarray.uuid));
            console.log(localarray.uuid, element.sender_uuid);
            var found = localarray.some(function (el) {
              return localarray.uuid === element.sender_uuid;
            });
            if (!found) {
              console.log("pushingtoarray found",element.sender_uuid);
              localarray.push({
                'uuid': element.sender_uuid
              });
            }
          } else {
            console.log("pushingtoarray",element.sender_uuid);
            localarray.push({
              'uuid': element.sender_uuid
            });
          }
        }, this);

        console.log(localarray);
        // _.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);

        console.log("userlist", userList);

      }, 1500);


      // console.log(x);
      //console.log($scope.messages);
      //$scope.messages = this.messageBank;
    }
  };
});