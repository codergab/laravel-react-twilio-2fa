<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class BackendController extends Controller
{
    /**
     * Checks if a user is logged in
     */

     public function checkAuth(Request $request)
     {
         return $request;
     }

    public function userLogin(Request $request)
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            return response()->json(['successful' => true]);
        }else {
            return response()->json(['successful' => false,'error' => 'Invalid Credentials']);
        }
    }
}
