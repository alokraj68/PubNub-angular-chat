angular.module('homer').directive('messageItem', function(MessageService) {
  return {
    restrict: "E",
    templateUrl: 'scripts/controllers/chat/message-item/message-item.html',
    scope: {
      senderUuid: "@",
      content: "@",
      date: "@"
    }
  };
});