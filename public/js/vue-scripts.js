Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').attr('value');
var url = $('#base_url').data('value');

var oCategories = $(this).data('object');

var vm = new Vue({

    el: '#layout',

    data: {
        categories: []
    },


    ready: function () {
        this.fetchCategories();
    },
    methods: {
        fetchCategories: function () {

            this.$http.get(url + '/categories', function (categories) {
                vm.$set('categories', categories);
            });

        }
    }
});

myApp.onPageInit('items-show', function (page) {
    new Vue({
        el: '#items',
        data: {
            items: [],
            search: ''
        },
        ready: function () {
            this.fetchItems();
        },
        methods: {
            fetchItems: function () {

                this.$http.get(url + '/fetchAllItems', function (items) {
                    this.$set('items', items);
                });
            }
        }
    });
});
myApp.onPageInit('search-products', function (page) {
    new Vue({
        el: '#search-products',
        data: {
            products: [],
            search: ''
        },
        ready: function () {
            this.products = $('#search-products').data('object');
        },
        methods: {

            deleteProduct: function (product) {

                var that = this;
                this.$http.delete(url + '/products/' + product.id, function (response) {
                    //delete from the list
                    console.log(response);
                    that.products.$remove(product);
                });
            }
        }
    });
});
myApp.onPageInit('products-show', function (page) {
    new Vue({
        el: '#all-products',
        data: {
            products: [],
            search: ''
        },
        ready: function () {
            this.fetchProducts();
        },
        methods: {
            fetchProducts: function () {
                this.$http.get(url + '/get-all-products', function (products) {
                    console.log(products)
                    this.$set('products', products);
                });
            },

            deleteProduct: function (e) {
                e.preventDefault();
                console.log(e);
                this.$http.delete(url + '/products/' + product_id, function () {
                    //delete from the list
                });
            }
        }
    });
});
myApp.onPageInit('products-create', function (page) {

    var mySwiper3 = myApp.swiper('.swiper-3', {
        pagination: '.swiper-3 .swiper-pagination',
        spaceBetween: 10,
        slidesPerView: 3
    });
    var category_id = $('#category_id').find('option:selected').val();
    new Vue({
        el: '#products-create',
        data: {
            choice: 1,

            brands: [
                {
                    id: '',
                    name: ''
                }
            ],
            fields: {
                name: '',
                description: '',
                photo: ''
            },
            products: [],
            submitted: false,
        },
        computed: {
            errors: function () {

                for (var key in this.fields) {
                    if (!this.fields[key]) return true;
                }

                return false;
            }
        },
        ready: function () {

            this.fetchBrands();
            this.fetchNewProducts();
        },
        methods: {
            onFileChange: function (e) {

                var files = e.target.files || e.dataTransfer.files;
                if (!files.length) {

                }

                this.fields.photo = files;
                console.log(files);

            },

            fetchBrands: function () {
                var category_id = $('#category_id').find('option:selected').val();

                this.$http.get(url + '/get-brands/' + category_id, function (brands) {
                    this.$set('brands', brands);
                    this.choice = brands[0].id;
                });

            },
            fetchNewProducts: function () {

                this.$http.get(url + '/get-new-products', function (products) {
                    this.$set('products', products);
                });
            },

            onSubmitForm: function (e) {

                e.preventDefault();

                var fd = new FormData(document.querySelector('form'));

                $('#photo').val('');

                var fields = this.fields;

                this.$http.post(url + '/products', fd);

                this.submitted = true;

                this.fields = {
                    name: '', description: '', photo: ''
                }
            },
        }
    });
});
myApp.onPageInit('categories-create', function (page) {

    var vm = new Vue({
        el: '#categories',

        data: {

            categories: [],

            fields: {
                name: ''
            },

            submitted: false
        },

        ready: function () {
            this.fetchCategories();
        },

        computed: {
            errors: function () {

                for (var key in this.fields) {
                    if (!this.fields[key]) return true;
                }

                return false;
            }
        },

        methods: {

            fetchCategories: function () {

                this.$http.get(url + '/categories', function (categories) {
                    console.log(categories);
                    this.$set('categories', categories);
                });

            },

            addCategory: function (e) {
                e.preventDefault();

                var fd = new FormData(document.querySelector('form'));

                $('#name').val('');

                this.$http.post(url + '/categories', fd);

                this.submitted = true;

            }
        }


    });
});
myApp.onPageInit('categories-manage', function (page) {

    var oCategories = $('#categories').data('object');

    var vm = new Vue({

        el: '#categories',

        data: {
            categories: oCategories
        },

        methods: {

            deleteCategory: function (category_id) {

                this.$http.delete(url + '/categories/' + category_id, function (response) {
                    console.log(response);
                });

            }
        }

    });

    $$(document).on('delete', '.swipeout', function () {
        $category_id = $(this).data('id');
        vm.deleteCategory($category_id);
    });


});
