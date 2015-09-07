angular.module('jsonService', ['ngResource'])

.factory('JsonService', function ($resource) {
    alert("GetShirts1");
    var shirts = $resource('data/bestsellers.json');
    return shirts;
})

.factory('itemService', function ($resource) {
    alert("GetShirtsA");
    return $resource('data/bestsellers.json');
});