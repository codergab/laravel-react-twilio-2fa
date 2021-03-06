<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/check-login-status', function () {
    if (auth()->check()) {
        return response()->json('ok');
    }

    return response()->json('Not Logged in');
});

Route::post('/user/login','BackendController@userLogin');
Route::post('sms/send','BackendController@sendMessage');
Route::post('sms/verify','BackendController@verifyAuthcode');
Route::get('/{path?}', function () {
    return view('index');
})->where('path', '.*');
