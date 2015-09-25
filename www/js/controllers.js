angular.module('starter.controllers', ['ngResource', 'jsonService', 'ngCordova'])

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
.controller('BestsellerCtrl', function ($scope, $rootScope, JsonService) {
    JsonService.get(function (data) {
        $scope.images = data.images;
        $rootScope.images = data.images;
    })
})
.controller('ContactsCtrl', function ($rootScope, $scope, $cordovaContacts) {
    //alert("Contacts" + $cordovaContacts);
    document.addEventListener("deviceready", init, false);

    function init() {
        document.querySelector("#pickContact").addEventListener("touchend", doContactPicker, false);
    }

    function doContactPicker() {
        navigator.contacts.pickContact(function (contact) {
            console.log('The following contact has been selected:' + JSON.stringify(contact));
         contact.name.formatted = getName(contact);
            $rootScope.contact = contact;
            //Build a simple string to display the Contact - would be better in Handlebars
            //var s = "<div class='flex-item:nth-child(1)'";
            //s += "<h1>" + getName(contact) + "</h1>" + "<br/>";

            //if (contact.emails && contact.emails.length) {
            //    s += "Email: " + contact.emails[0].value + "<br/>";
            //}

            //if (contact.phoneNumbers && contact.phoneNumbers.length) {
            //    s += "Phone: " + contact.phoneNumbers[0].value + "<br/>";
            //}

            //if (contact.addresses && contact.addresses.length) {

            //    for (j = 0; j < contact.addresses.length; j++) {
            //        if (contact.addresses[j].streetAddress) {
            //            (s += "<br /><button ng-click='saveAddress(j)' >" + j.toString() + "...</button><br />"
            //                +
            //                    "Street Address: " + contact.addresses[j].streetAddress + "<br/>" +
            //                    "Locality: " + contact.addresses[j].locality + "<br/>" +
            //                    "Region: " + contact.addresses[j].region + "<br/>" +
            //                    "Postal Code: " + contact.addresses[j].postalCode + "<br/>" +
            //                    "Country: " + contact.addresses[j].country) + "<br/>";
            //        }
            //    }
            //}

            //if (contact.photos && contact.photos.length) {
            //    s += "<p><img src='" + contact.photos[0].value + "'></p>";
            //}

            //document.querySelector("#selectedContact").innerHTML = s;
        },

        function (err) {
            console.log('Error: ' + err);
        });
    }

    /*
    Handles iOS not returning displayName or returning null/""
    */
    function getName(c) {
        var name = c.displayName;
        if (!name || name === "") {
            if (c.name.formatted) return c.name.formatted;
            if (c.name.givenName && c.name.familyName) return c.name.givenName + " " + c.name.familyName;
            return "Nameless";
        }
        return name;
    }
})

.controller('DesignCtrl', function ($scope, $rootScope, design) {
    //$scope.design = design;
    $rootScope.design = design;
})

.controller('TodosCtrl', function ($scope, todos) {
    $scope.todos = todos;
})

.controller('TodoCtrl', function ($scope) {
})

.controller('ContactCtrl', function ($rootScope, $scope) {
    $scope.pickAddress = function (street,city,state,zip,country) {
        $rootScope.design[3].details.Street = street;
        $rootScope.design[3].details.City = city;
        $rootScope.design[3].details.State = state;
        $rootScope.design[3].details.Zip = zip;
        $rootScope.design[3].details.Country = country;
    };
})

.controller('shirtCardCtrl', function ($rootScope, $http, $scope, $stateParams, ShirtService, $ionicPopover, $ionicSlideBoxDelegate, $ionicPopup, $timeout) {
    // .fromTemplate() method
    var template = '<ion-popover-view><ion-header-bar> <h1 class="title">Hello</h1> </ion-header-bar> <ion-content></ion-content></ion-popover-view>';
    $scope.showPopup = function () {
        $scope.data = {}

        $ionicPopup.show({
            template: '<input type="password" ng-model="data.wifi">',
            title: 'Enter Wi-Fi Password',
            subTitle: 'Please use normal things',
            scope: $scope,
            buttons: [
              { text: 'Cancel' },
              {
                  text: '<b>Save</b>',
                  type: 'button-positive',
                  onTap: function (e) {
                      if (!$scope.data.wifi) {
                          //don't allow the user to close unless he enters wifi password
                          e.preventDefault();
                      } else {
                          return $scope.data.wifi;
                      }
                  }
              }
            ]
        });
        myPopup.then(function (res) {
            console.log('Tapped!', res);
        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);
    }

// A confirm dialog
$scope.showConfirm = function(item ) {
    var confirmPopup = $ionicPopup.confirm({
        title: item.name,
        template: item.sizes.toString()
    });
    confirmPopup.then(function(res) {
        if (res) {
            $rootScope.design[2].details.Color = item.name;
            
            console.log('You are sure');
        } else {
            console.log('You are not sure');
        }
    })}

// An alert dialog
$scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
        title: 'Don\'t eat that!',
        template: 'It might taste good'
    });
    alertPopup.then(function(res) {
        console.log('Thank you for not eating my delicious ice cream cone');
    });
}

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope      
    });
    // .fromTemplateUrl() method
    $ionicPopover.fromTemplateUrl('my-popover.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;    }); 
    $scope.openPopover = function ($event, button) {
        $scope.button = button;
        $scope.popover.show($event);
        $scope.popover.updateColor = function (color, isChecked) {
            $rootScope.design[2].details.Sizes = color;
        }
    };
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });
    // Execute action on hide popover
    $scope.$on('popover.hidden', function () {
        // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function () {
        // Execute action
    });
    $scope.styleId = $stateParams.styleId;
    if ($rootScope.products.length === null) alert("Oops! Please reload");
    for (i = 0; i < $rootScope.products.length; i++) {
        if ($rootScope.products[i].style == $scope.styleId) {
            $rootScope.shirt = $rootScope.products[i];
        }
    }
    var aShirt = $rootScope.shirt;
    var garmentUrl = aShirt.url;
    $http.get(garmentUrl, {
        params: {
            "key1": "value1",
            "key2": "value2"
        }
    })
    .success(function (data) {
        $scope.shirt = data;
    })
        
    .error(function (data) {
        alert("ERROR");
    });

    $scope.nextSlide = function () {
        $ionicSlideBoxDelegate.next();
    }

    $scope.updateShirtDetails = function(size, garment, brand,style){
        //alert(size + garment);
        $rootScope.design[2].details.Size = size;
        //$scope.shirt.colors[0].sizes
        $rootScope.design[2].value = garment;
        $rootScope.design[2].details.Name = garment;
        $rootScope.design[2].details.Brand = brand;
        $rootScope.design[2].details.Style = style;
    };
})

.controller('detailsCtrl', function ($scope, $rootScope, $stateParams) {
    var myId = 0;
    myId = $stateParams.id - 1;
    var myImages = [];
    myImages = $rootScope.images;
    $scope.item = myImages[myId];
    //alert($scope.item.image.url);
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

.controller('GarmentsCtrl', function ($rootScope, $scope, $http, ProductService, $stateParams) {
    $scope.catagories = [
        { title: 'Hoodies', id: 'Hoodies' },
        { title: 'Unisex', id: 'Unisex' },
        { title: 'Youth', id: 'Youth' },
        { title: 'Female', id: 'Female' },
        { title: 'Men', id: 'Men' },
        { title: 'All', id: '' }
    ];

    $stateParams.filterId = 'Hoodies';
    $scope.filterFunction = function (element) {
        return element.name.match('/^Bella/') ? true : false;
    };
    ProductService.get(function (data) {
        $rootScope.products = data.products;
    })

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
    { title: 'Hoodies', id: 'Hoodies' },
    { title: 'Unisex', id: 'Unisex' },
    { title: 'Youth', id: 'Youth' },
    { title: 'Female', id: 'Female' },
    { title: 'Men', id: 'Men' },
    { title: 'All', id: '' }
    ];
})

.controller('QuoteCtrl', function ($scope, QuoteService, $rootScope) {

    QuoteService.get(function (data) {
        $scope.quotations = data.quotes;
    });

    $scope.pickMessage = function (text) {
        $rootScope.design[0].value = text;
    };
}
)
.controller('ErrorCtrl', function ($rootScope) {

})

.controller('PlaylistCtrl', function ($scope, $stateParams) {
});
