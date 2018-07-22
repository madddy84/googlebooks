var app = angular.module("library-app");

app.controller("listBooksController",
    ["$http",
        function ($http) {
            var vm = this;
            vm.pageIndex = 0;
            vm.pageSize = 20;
            vm.totalRecordsDisplayed = 0;
            vm.responseTime = 0;

            vm.nextPage = function () {
                vm.pageIndex++;
                vm.getBooks();
            }

            vm.prevPage = function () {
                if (vm.pageIndex > 0) {
                    vm.pageIndex--;
                }
                vm.getBooks();
            }

            vm.onSearch = function (txtSearch) {
                vm.searchText = txtSearch;
                vm.getBooks();
            }

            vm.getBooks = function () {
                var sendDate = (new Date()).getTime();
                $http.get("https://www.googleapis.com/books/v1/volumes?q=" + vm.searchText + "''&" +
                    "filter=free-ebooks&" +
                    "projection=lite&" +
                    "maxResults=20&" +
                    "orderBy=newest&" +
                    "startIndex=" + (vm.pageIndex * vm.pageSize)
                ).then(function (responce) {
                    vm.books = responce.data.items;
                    vm.totalRecordsDisplayed = responce.data.totalItems;
                    var receiveDate = (new Date()).getTime();

                    vm.responseTime = (receiveDate - sendDate);
                });
            }
        }
    ]);