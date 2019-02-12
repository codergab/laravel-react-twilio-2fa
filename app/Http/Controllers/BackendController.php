<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BackendController extends Controller
{
    /**
     * Checks if a user is logged in
     */

     public function checkAuth(Request $request)
     {
         return $request;
     }
}
