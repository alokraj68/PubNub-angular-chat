angular.module('homer')
.factory('currentUser', ['$rootScope', '$q',
    function MessageServiceFactory($rootScope, $q) {
        console.log("user service loaded.");
        this.userName = string;


        var currentUser = function(){
            if (typeof(Storage) !== "undefined") {
                    // Store
                    var uname = localStorage.getItem("username");
                    console.log(uname);
                    this.userName = uname;
                    // Retrieve
                    
                } else {
                    console.log("Sorry, your browser does not support Web Storage...");
                }
                return this.userName;
        }
        return {
            currentUser : currentUser
        }
    }
]);

// angular.module('homer')
// .value('currentUser', "defaultUser");


// function makeid() {
//     var text = "";
//     var possible = "ABC";
  
//     for (var i = 0; i < 1; i++)
//       text += possible.charAt(Math.floor(Math.random() * possible.length));
  
//     return text;
//   }

// function getUser(){
//   if (typeof(Storage) !== "undefined") {
//     // Store
//     var uname = localStorage.getItem("username");
//     console.log(uname);
//     return uname;
//     // Retrieve
    
// } else {
//     document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
// }
// }