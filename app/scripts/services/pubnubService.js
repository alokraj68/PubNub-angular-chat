angular.module('homer')
    .factory('PubnubService', ['$rootScope', '$q', 'Pubnub',
        function MessageServiceFactory($rootScope, $q, Pubnub) {
            console.log("pubnub service loaded.");
            var self = this;
            this.userName = '';


            console.log("user service loaded.");

            var pubnubInit = function () {
                if (typeof (Storage) !== "undefined") {
                    // Store
                    var currentUser = localStorage.getItem("username");
                    Pubnub.init({
                        publish_key: 'pub-c-a1cd7ac1-585e-478e-925b-65d17ce62f7d',
                        subscribe_key: 'sub-c-204f063e-c559-11e5-b764-02ee2ddab7fe',
                        uuid: currentUser,
                        origin: 'pubsub.pubnub.com',
                        ssl: true
                    }); 
                    // Pubnub.init({
                    //     publish_key: 'pub-c-16e437f7-6523-4779-9ecd-da0ee9d2342e',
                    //     subscribe_key: 'sub-c-1980a88a-7b7e-11e7-bda6-0619f8945a4f',
                    //     uuid: currentUser,
                    //     origin: 'pubsub.pubnub.com',
                    //     ssl: true
                    // });


                    // Retrieve

                } else {
                    console.log("Sorry, your browser does not support Web Storage...");
                }

            }

            return {
                pubnubInit: pubnubInit

            }
        }
    ]);