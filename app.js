angular.module('meanNews', [])
.controller('MainCtrl', [
    '$scope', 
    function($scope){
      $scope.test = 'Hello World';
      $scope.posts = [
        {title: 'post 1', upvotes: 5 },
        {title: 'post 2', upvotes: 2 },
        {title: 'post 3', upvotes: 15 },
        {title: 'post 4', upvotes: 10 }
      ];
      $scope.addPost = function(){
        $scope.posts.push({title: 'a new post!', upvote: 0 });
      };
    }
  ]);