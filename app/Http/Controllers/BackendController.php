<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Twilio\Rest\Client;
use Twilio\Jwt\ClientToken;

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
            return response()->json(['successful' => false,'error' => 'Invalid Credentials, Please Check your details!']);
        }
    }

    /**
     * Send message to the user
     */

     public function sendMessage(Request $request)
     {
        if(auth()->check()) {

            $accountSid = env('TWILIO_ACCOUNT_SID') || 8988;
            $authToken  = env('TWILIO_AUTH_TOKEN') || 98989;
            // $appSid     = config('app.twilio')['TWILIO_APP_SID'];

            $client = new Client($accountSid, $authToken);
            try
            {

                $random_auth_code = rand(1234567,7654321);
                // Use the client to do fun stuff like send text messages!
                $client->messages->create(
                // the number you'd like to send the message to
                '+2348050696168',
                array(
                        // A Twilio phone number you purchased at twilio.com/console
                        'from' => '+12564459688',
                        // the body of the text message you'd like to send
                        'body' => 'Your AUTH Code is - '.$random_auth_code
                    )
                );

                session()->put('auth_code',$random_auth_code);

                return response()->json(['successful' => true]);
            }
            catch (Exception $e)
            {
                return response()->json(['error' => $e->getMessage(),'successful' => false]);
            }
        }

        return response()->json(['successful' => false]);
        
    }

    /**
     * Verify authcode
     */
    public function verifyAuthcode(Request $request)   
    {
        if(session()->exists('auth_code')) {
            $session_code = session()->get('auth_code');
            if($session_code == $request->auth_code) {
                return response()->json(['successful' => true, 'match' => true]);
            }else {
                return response()->json(['successful' => false, 'match' => false]);
            }
        }
    }
}