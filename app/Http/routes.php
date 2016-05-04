<?php

Route::get('test', function ()
{

    $category_id = 1;

    $brands = App\Models\Collection::where('category_id', $category_id)->get();

    foreach ($brands as $brand)
    {

        $brand_ = App\Models\Brand::find($brand->brand_id);

        $brand_names[] = [
            'name' => $brand_->name,
            'id'   => $brand_->id
        ];
    }


    return $brand_names;

    return $brand_id;
});
Route::get('welcome', function ()
{
    return view('welcome');
});

Route::get('password/email', 'Auth\PasswordController@getEmail');
Route::post('password/email', 'Auth\PasswordController@postEmail');
Route::get('password/reset/{token}', 'Auth\PasswordController@getReset');
Route::post('password/reset', 'Auth\PasswordController@postReset');

Route::group(['middleware' => 'web'], function ()
{
    Route::auth();
    Route::get('/', function ()
    {
        $categories = App\Models\Category::all();

        return view('layout', ['categories' => $categories]);
    });

    Route::resource('products', 'ProductController');
    Route::resource('categories', 'CategoryController');
    Route::resource('brands', 'BrandController');
    Route::resource('carts', 'CartController');
    Route::resource('items', 'ItemController');


    Route::get('show-items/{product_id}', 'ItemController@fetchProductItems');
    Route::get('items/create/{product_id}', 'ItemController@create');
    Route::get('get-all-products', 'ProductController@fetchAllProducts');
    Route::get('fetchAllItems', 'ItemController@fetchAllItems');
    Route::get('get-new-products', 'ProductController@fetchNewProducts');
    Route::get('fetchAllProducts', 'ProductController@fetchAllProducts');
    Route::get('/home', 'HomeController@index');
    Route::get('manage-categories', 'CategoryController@showManageCategories');
    Route::get('manage-brands', 'BrandController@showManageBrands');


    Route::get('cart-items/{product}', function ($product)
    {
        dd($product);
    });
    Route::get('get-items', function ()
    {
        $items = App\Models\Item::all();

        foreach ($items as $item)
        {

            foreach ($item->photos as $photo)
            {
            }
        }

        return $items;
    });
    Route::get('get-brands/{category_id}', function ($category_id)
    {

        $brands = App\Models\Collection::where('category_id', $category_id)->get();

        $brand_names = [];

        foreach ($brands as $brand)
        {
            $brand_ = App\Models\Brand::find($brand->brand_id);

            $brand_names[] = [
                'name' => $brand_->name,
                'id'   => $brand_->id
            ];
        }

        return $brand_names;

    });
    Route::get('get-brands', function ()
    {

        $brands = App\Models\Brand::all();

        return $brands;

    });
    Route::get('users/{id}', function ($id)
    {
        $user = App\Models\User::find($id);

        return view('users/showuser', ['user' => $user]);
    });
    Route::get('products/{category_name}/{brand_name}', function ($category_name, $brand_name)
    {

        $category_id = App\Models\Category::where('name', '=', $category_name)->value('id');

        $brand_id = App\Models\Brand::where('name', '=', $brand_name)->value('id');

        $collections = App\Models\Collection::where('brand_id', $brand_id)->where('category_id', $category_id)->first();

        foreach ($collections->products as $collection)
        {

            foreach ($collection->photos as $photo)
            {
            }
        }
        return view('products.showproducts', ['products' => $collections->products]);
    });


    //TODO delete collection on categories
    Route::delete('collections/{id}', function ($id)
    {

        $collection = App\Models\Collection::find($id);

        $collection->delete();

        return 'Deleted';
    });
});
