angular.module('meanNews', ['ui.router'])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
      $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl',
        resolve: {
          postPromise: ['posts', function(posts){
            return posts.getAll();
          }]
        }
      })
      .state('posts', {
        url:'/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostCtrl'
      })
      $urlRouterProvider.otherwise('home');
    }
  ])
  
  .factory('posts', ['$http', function($http){
    var o = {
      posts: [
        // {title: 'post 1', upvotes: 5 },
        // {title: 'post 2', upvotes: 2 },
        // {title: 'post 3', upvotes: 15 },
        // {title: 'post 4', upvotes: 10 }
      ]
    };

    o.getAll = function() {
      return $http.get('/posts').success(function(data){
        angular.copy(data, o.posts);
      });
    };

    o.create = function(post) {
      return $http.post('/posts', post).success(function(data){
        o.posts.push(data);
      });
    };

    return o;

  }])

  .controller('MainCtrl', [
    '$scope',
    'posts',
    function($scope, posts){
      $scope.posts = posts.posts;

      $scope.addPost = function(){
        if(!$scope.title || $scope.title === '') { return; }
        posts.create({
          title: $scope.title,
          link: $scope.link,
        });
        $scope.title = '';
        $scope.link = '';
      };

      $scope.incrementUpvotes = function(post){
        post.upvotes += 1;
      };
    }
  ])

  .controller('PostCtrl', [
    '$scope',
    '$stateParams',
    'posts',
    function($scope, $stateParams, posts){
      $scope.post = posts.posts[$stateParams.id];

      $scope.addComment = function(){
        if($scope.body === '') { return; }
        $scope.post.comments.push({
          body: $scope.body,
          author: 'user',
          upvotes: 0
        });
        $scope.body = '';
      };
      $scope.incrementUpvotes = function(comments){
        comments.upvotes += 1;
      };
    }
  ]);
