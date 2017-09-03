angular.module('homer')
  .factory('MessageServicePvt', ['$rootScope', '$q', 'Pubnub','PubnubService',
    function MessageServiceFactoryPvt($rootScope, $q, Pubnub,PubnubService) {

      // Aliasing this by self so we can access to this trough self in the inner functions
      var self = this;
      this.messages = []

      if (typeof (Storage) !== "undefined") {
        // Store
        var currentUser = localStorage.getItem("username");
       
        // Retrieve

    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }

       this.channel =currentUser  + 'incoming';
      // this.channel = 'messages-channel6';

      console.log("channel : " + this.channel);
      console.log("currentUser : " + currentUser);

      // We keep track of the timetoken of the first message of the array
      // so it will be easier to fetch the previous messages later
      this.firstMessageTimeToken = null;
      this.messagesAllFetched = false;

      var whenDisconnected = function () {
        console.log('Connection lost. Trying to reconnect...');
      };

      var whenReconnected = function () {
        console.log('Connection re-established.');
      };

      var init = function () {
PubnubService.pubnubInit();
        Pubnub.subscribe({
          channel: self.channel,
          disconnect: whenDisconnected,
          reconnect: whenReconnected,
          triggerEvents: ['callback']
        });

        Pubnub.time(function (time) {
          self.firstMessageTimeToken = time;
        })

        subcribeNewMessage(function (ngEvent, m) {
          self.messages.push(m)
          $rootScope.$digest()
        });

      };

      var populate = function () {

        var defaultMessagesNumber = 20;

        Pubnub.history({
          channel: self.channel,
          callback: function (m) {
            // Update the timetoken of the first message
            self.timeTokenFirstMessage = m[1]
            angular.extend(self.messages, m[0]);

            if (m[0].length < defaultMessagesNumber) {
              self.messagesAllFetched = true;
            }

            $rootScope.$digest()
            $rootScope.$emit('factory:message:populated')

          },
          count: defaultMessagesNumber,
          reverse: false
        });

      };

      ////////////////// PUBLIC API ////////////////////////

      var subcribeNewMessage = function (callback) {
        $rootScope.$on(Pubnub.getMessageEventNameFor(self.channel), callback);
      };


      var fetchPreviousMessages = function () {

        var defaultMessagesNumber = 10;

        var deferred = $q.defer()

        Pubnub.history({
          channel: self.channel,
          callback: function (m) {
            // Update the timetoken of the first message
            self.timeTokenFirstMessage = m[1]
            Array.prototype.unshift.apply(self.messages, m[0])

            if (m[0].length < defaultMessagesNumber) {
              self.messagesAllFetched = true;
            }

            $rootScope.$digest()
            deferred.resolve(m)

          },
          error: function (m) {
            deferred.reject(m)
          },
          count: defaultMessagesNumber,
          start: self.timeTokenFirstMessage,
          reverse: false
        });

        return deferred.promise
      };


      var getMessages = function () {

        if (_.isEmpty(self.messages))
          populate();
        
        return self.messages;

      };

      var messagesAllFetched = function () {

        return self.messagesAllFetched;

      };

      var sendMessage = function (messageContent, toUser) {

        // Don't send an empty message 
        if (_.isEmpty(messageContent))
          return;
        if (_.isEmpty(toUser)){
         console.log("user empty");
          return;
        }
        console.log(toUser + "incoming", messageContent);
                  // channel: self.channel,
        Pubnub.publish({
          channel: toUser + "incoming",
          message: {
            uuid: (Date.now() + currentUser),
            content: messageContent,
            sender_uuid: currentUser,
            date: Date.now()
          },
        });
        Pubnub.publish({
          channel: self.channel,
          message: {
            uuid: (Date.now() + currentUser),
            content: messageContent,
            sender_uuid: currentUser,
            date: Date.now()
          },
        });
      };


       init();

      // The public API interface
      return {
        getMessages: getMessages,
        sendMessage: sendMessage,
        subscribeNewMessage: subcribeNewMessage,
        fetchPreviousMessages: fetchPreviousMessages,
        messagesAllFetched: messagesAllFetched
      }

    }
  ]).factory('userList', [function(){
    return { items: [] };
  }]);;