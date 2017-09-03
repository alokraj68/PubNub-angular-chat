angular
    .module('homer')
    .controller('loginCtrl', loginCtrl)

    

function loginCtrl($scope, $window) {
    console.log("login controller on");
    this.username = $scope.username;
    $scope.GoOn = function () {
        console.log(this.username);
        if(this.username && this.username.length>0){
            if (typeof(Storage) !== "undefined") {
                // Store
               localStorage.setItem("username",this.username);
           
                $window.location.href = '#/app_views/private_chat_view';
                // this.username = uname;
                // Retrieve
                
            } else {
                console.log("Sorry, your browser does not support Web Storage...");
            }
        
        }
        else{
            console.log("usrname length zero");
        }
    }
}