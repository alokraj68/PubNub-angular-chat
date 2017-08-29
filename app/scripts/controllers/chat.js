// /**
//  *
//  * chatCtrl
//  *
//  */

// angular
// .module('homer')
// .controller('chatCtrl',chatCtrl)


//  function chatCtrl($scope,Pubnub) {        
//     console.log("init run");

//     $scope.messages = [];
//     $scope.channel = 'messages-channel';
//     // Subscribing to the ‘messages-channel’ and trigering the message callback


//     $scope.initChat = function() {
        
//         console.log("in functions");
//         // Generating a random uuid between 1 and 100 using an utility function from the lodash library.         
//         $scope.uuid =$scope.name;
//         Pubnub.init({
//               publish_key: 'pub-c-16e437f7-6523-4779-9ecd-da0ee9d2342e',
//               subscribe_key: 'sub-c-1980a88a-7b7e-11e7-bda6-0619f8945a4f',
//               uuid: $scope.uuid
//             });
//             Pubnub.subscribe({
//                 channel: $scope.channel,
//                 triggerEvents: ['callback']
//             });
//         console.log("initiated chat for " + $scope.name);
//     };

//     $scope.sendMessage = function() {
//         // Don't send an empty message 
//         if (!$scope.messageContent || $scope.messageContent === '') {
//              return;
//          }
//          Pubnub.publish({
//              channel: $scope.channel,
//              message: {
//                  content: $scope.messageContent,
//                  sender_uuid: $scope.uuid,
//                  date: new Date()
//              },
//              callback: function(m) {
//                  console.log(m);
//              }
//          });
//          // Reset the messageContent input
//          $scope.messageContent = '';
 
//      }

//      // Listening to the callbacks
// $scope.$on(Pubnub.getMessageEventNameFor($scope.channel), function (ngEvent, m) {
//     $scope.$apply(function () {
//         $scope.messages.push(m)
//     });
// });

// // A function to display a nice uniq robot avatar 
// $scope.avatarUrl = function(uuid){
//     return 'http://robohash.org/'+uuid+'?set=set2&bgset=bg2&size=70x70';
// };
//   };
