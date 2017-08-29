angular.module('homer').directive('userAvatar', function() {
    return {
      restrict: "E",
      template: '<img class="message-avatar" src="{{avatarUrl}}" alt="{{uuid}}">',
      scope: {
        uuid: "@",
      },
      controller: function($scope){
        // Generating a uniq avatar for the given uniq string provided using robohash.org service
        $scope.avatarUrl = 'http://robohash.org/' + $scope.uuid + '?set=set2&bgset=bg2&size=70x70';
      }
    };
  });