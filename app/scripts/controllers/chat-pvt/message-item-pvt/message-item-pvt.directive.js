angular.module('homer').directive('messageItemPvt', function(MessageServicePvt) {
  return {
    restrict: "E",
    templateUrl: 'scripts/controllers/chat-pvt/message-item-pvt/message-item-pvt.html',
    scope: {
      senderUuid: "@",
      content: "@",
      date: "@"
    }
  };
});