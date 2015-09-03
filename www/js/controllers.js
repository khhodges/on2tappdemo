angular.module('starter.controllers', ['ngResource', 'jsonService'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})
.controller('VeryBestCtrl', function ($scope, JsonService) {
    JsonService.get(function (data) {
        $scope.images = data.images;
    })
})

    .controller('MapCtrl', function ($scope, $ionicLoading) {
        $scope.mapCreated = function (map) {
            $scope.map = map;
        };

        $scope.centerOnMe = function () {
            console.log("Centering");
            if (!$scope.map) {
                return;
            }

            $scope.loading = $ionicLoading.show({
                content: 'Getting current location...',
                showBackdrop: false
            });

            navigator.geolocation.getCurrentPosition(function (pos) {
                console.log('Got pos', pos);
                $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                $scope.loading.hide();
            }, function (error) {
                alert('Unable to get location: ' + error.message);
            });
        };
    })

    .controller('GarmentsCtrl', function ($scope, $http) {
        $http.get("https://api.scalablepress.com/v2/categories", {
            params: {
                "key1": "value1",
                "key2": "value2"
            }
        })
          .success(function (data) {
              $scope.catList = data;
          })
          .error(function (data) {
              alert("ERROR");
          });

        $http.get("https://api.scalablepress.com/v2/products/hanes-50-50-hoodie", {
            params: {
                "key1": "value1",
                "key2": "value2"
            }
        })
          .success(function (data) {
              $scope.garmentsList = data;
          })
          .error(function (data) {
              alert("ERROR2");
          });
    })

.controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
      { title: 'Reggae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
    ];
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {
});
