angular.module('jsonService', ['ngResource'])

.factory('JsonService', function ($resource) {
    //alert("GetShirts1");
    return $resource('data/bestsellers.json');
})
.service('TodosService', function ($q) {
    return {
        todos: [
          {
              id: '1',
              name: 'Pick up apples',
              done: false
          },
          {
              id: '2',
              name: 'Mow the lawn',
              done: true
          }
        ],
        getTodos: function () {
            return this.todos
        },
        getTodo: function (todoId) {
            var dfd = $q.defer()
            this.todos.forEach(function (todo) {
                if (todo.id === todoId) dfd.resolve(todo)
            })

            return dfd.promise
        }
    }
})

.service('DesignService', function ($q) {
    return {
        design: [
            {
                id: 'Message',
                value: 'Been there done that!',
                template:'#/app/quotelist'
            },
            {
                id: 'Image',
                value: 'Venice, Italy',
                template: '#/app/location',
                details: [{
                    url: 'http://i.telegraph.co.uk/multimedia/archive/02338/Venice-rialto_2338359b.jpg',
                    date: 'Sep 23, 2015',
                    Name: 'Vanice, Italy'
                },
                ]
            },
            {
                id: 'Product',
                value: 'Click to select the garment',
                template: '#/app/garments',
                details: [{
                    Brand: 'Anvil',
                    Name: 'Click to select the garment',
                    Style: '880',
                    Color: 'white',
                    Size: 'large'
                }]
            },
            {
                id: 'ShippingTo',
                value: 'Click to add the shipping address',
                template: '#/app/contacts',
                details: [{
                    Name: 'Christine Hamer-Hodges',
                    Street: 'Hillsboro Mile',
                    Apt: '208',
                    City: 'Hillsboro Beach',
                    Zip: '33062',
                    Country:'USA'
                }]
            },
            {
                id: 'Charges',
                value: '$27.50 USD',
                template: '#/app/shipping',
                details: [{
                    Item: '10',
                    Prints:'2',
                    FirstPrint: '7.00',
                    AdditionalPrints: '2',
                    Packaging: '1.50',
                    Shipping: '5.00',
                    Priority: 'Ground',
                    Destination:'Domestic'
                }]
            }
        ],
        getDesign: function () {
            return this.design
        },
        getOption: function (optionId) {
            var dfd2 = $q.defer()
            this.design.forEach(function (option) {
                if (design.id === optionId) dfd2.resolve(option)
            })
            return dfd2.promise
        }
    }
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
.factory('ShirtService', function ($http) {
    var shirts = [];
    return {
        getShirts: function () {
            return $http.get("https://api.scalablepress.com/v2/categories").then(function (response) {
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