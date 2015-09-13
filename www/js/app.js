// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core','ionic.service.analytics', 'starter.controllers', 'starter.directives'])

.run(['$ionicAnalytics', function ($ionicAnalytics) {
    $ionicAnalytics.register();
}])

.run(function ($ionicPlatform, $ionicAnalytics) {
    $ionicPlatform.ready(function () {
        $ionicAnalytics.register();
        // 204072158929 Google Project number. 
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'AppCtrl'
      })

    .state('app.garments', {
        url: "/garments",
        views: {
            'menuContent': {
                templateUrl: "templates/garments.html",
                controller: 'GarmentsCtrl'
            }
        }
    })
    .state('app.location', {
        url: "/location",
        views: {
            'menuContent': {
                templateUrl: "templates/location.html",
                controller: 'MapCtrl'
            }
        }
    })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html'
            }
        }
    })

    .state('app.browse', {
        url: '/browse',
        views: {
            'menuContent': {
                templateUrl: 'templates/browse.html',
                controller: 'BestsellerCtrl'
            }
        }
    })
    .state('app.image', {
        url: '/image/:id',
        views: {
            'menuContent': {
                templateUrl: 'templates/ImageCard.html',
                controller: 'BestsellerCtrl'
            }
        }
    })
    .state('app.quotelist', {
        url: '/quotelist',
        views: {
            'menuContent': {
                templateUrl: 'templates/quotelist.html',
                controller: 'QuoteCtrl'
            }
        }
    })


    .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
            'menuContent': {
                templateUrl: 'templates/playlist.html',
                controller: 'PlaylistCtrl'
            }
        }
    })
    .state('app.master', {
        url: "/master",
        views: {
            'menuContent': {
                templateUrl: 'templates/master.html',
                controller: 'masterCtrl'
            }
        }
    })
	.state('app.details', {
	    url: "/details/:id",
	    views: {
	        'menuContent': {
	            templateUrl: 'templates/details.html',
	            controller: 'detailsCtrl'
	        }
	    }
	})
    	.state('app.shirtCard', {
    	    url: "/shirtCard/:styleId",
    	    views: {
    	        'menuContent': {
    	            templateUrl: 'templates/shirtCard.html',
    	            controller: 'shirtCardCtrl'
    	        }
    	    }
    	})
    	.state('app.contacts', {
    	    url: "/contacts",
    	    views: {
    	        'menuContent': {
    	            templateUrl: 'templates/contacts.html',
    	            controller: 'ContactsCtrl'
    	        }
    	    }
    	})
    	.state('app.track', {
    	    url: "/track",
    	    views: {
    	        'menuContent': {
    	            templateUrl: 'templates/tracking.html',
    	            controller: 'GarmentsCtrl'

    	        }
    	    }
    	})
        .state('app.error', {
            url: "/error",
            views: {
                'menuContent': {
                    templateUrl: 'templates/error.html',
                    controller: 'ErrorCtrl'
                }
            }
        })
    	    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/quotelist');
});
