angular.module('starter.directives', [])

.directive('map', function () {
    return {
        restrict: 'E',
        scope: {
            onCreate: '&'
        },
        link: function ($scope, $element, $attr) {
            function initialize() {
                //The following shows a 45° perspective view of Palazzo Ducale in Venice, Italy:
                var myLatLng = { lat: 45.434046, lng: 12.340284 };
                var mapOptions = {
                    center: myLatLng,
                    zoom: 19,
                    mapTypeId: google.maps.MapTypeId.HYBRID
                };
                var map = new google.maps.Map($element[0], mapOptions);

                $scope.onCreate({ map: map });

                // Stop the side bar from dragging when mousedown/tapdown on the map
                google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
                    e.preventDefault();
                    return false;
                });
            }

            if (document.readyState === "complete") {
                initialize();
            } else {
                google.maps.event.addDomListener(window, 'load', initialize);
            }
        }
    }
});