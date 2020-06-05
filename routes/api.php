<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/projects/search/{name}', 'ProjectController@findByName');
Route::get('/projects/{id}', 'ProjectController@showAPI');
Route::get('/projects', 'ProjectController@all');
Route::post('/projects/add', 'ProjectController@add');
Route::post('/projects/update', 'ProjectController@update');
Route::post('/projects/delete', 'ProjectController@delete');

Route::post('/entry/start', 'EntryController@start');
Route::post('/entry/stop', 'EntryController@stop');
Route::post('/entry/delete', 'EntryController@delete');
