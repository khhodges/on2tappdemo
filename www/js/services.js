angular.module('jsonService', ['ngResource'])

.factory('JsonService', function ($resource) {
    //alert("GetShirts1");
    return $resource('data/bestsellers.json');
})

.factory('ProductService', function ($resource) {
    //alert("GetShirtsA");
    var myProducts = [];
    myProducts = $resource('data/productlist.json');
    return myProducts;
})
    .factory('QuoteService', function ($resource) {
        //alert("GetShirtsA");
        var myQuotations = [];
        myQuotations = $resource('data/quotes.json');
        return myQuotations;
    })
    .factory('CategoryService', function ($resource) {
        //alert("GetShirtsA");
        var myCategory = [];
        myProducts = $resource('data/categories.json');
        return myCategory;
    })

.factory('ProductServicey', function ($resource) {
    var myProducts = [];
    return {
        getShirts: function () {
            myProducts = $resource('data/productlist.json');
            return myProducts;
            },
        getShirt: function (styleId) {
            for (i = 0; i < myProducts.Products.length; i++) {
                if (myProducts.Products[i].style == styleId) {
                    return myProducts.Products[i];
                }
            }
            return null;
        }
    }
})
.factory('shirtService', function ($http) {
    var shirts = [];
    return {
        getShirts: function () {
            return $http.get("https://api.scalablepress.com/v2/products/hanes-50-50-hoodie").then(function (response) {
                shirts = response;
                return shirts;
            });
        },
        getShirt: function (id) {
            for (i = 0; i < shirts.length; i++) {
                if (shirts[i].id == id) {
                    return shirts[i];
                }
            }
            return null;
        }
    }
})
;