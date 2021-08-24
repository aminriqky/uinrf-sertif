<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DataController;

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

Route::group(['middleware' => 'api'], function() {
    Route::get('soal/all', [DataController::class, 'getSoal']);
    Route::post('soal/post', [DataController::class, 'postSoal']);

    Route::get('prodi/all', [DataController::class, 'getProdi']);
    Route::get('prodi/{id}', [DataController::class, 'getFileProdi']);
    Route::post('prodi/post', [DataController::class, 'postProdi']);
});