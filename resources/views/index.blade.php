<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" value="{{ csrf_token() }}" />
        <title>Laravel</title>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    </head>
    <body>
        @auth
        <input id="user_session" type="hidden" value="{{ auth()->user()->name }}">
        @endauth
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="/">LSMS</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            @guest
            <div class="collapse navbar-collapse" id="navbarColor01">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/sign-in">Login</a>
                    </li>
                    {{-- <li class="nav-item">
                        <a class="nav-link" href="/create-account">Register</a>
                    </li> --}}
                </ul>
            </div>
            @endguest
            @auth
            @if(!Request::is('/authentication/validate/two-factor') || !url()->current() == "/authentication/validate/two-factor")
            <div class="collapse navbar-collapse" id="navbarColor01">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" style="cursor: pointer" onclick="document.querySelector('#logout').submit();">Logout</a>
                        <form method="POST" action="{{ route('logout') }}" id="logout">
                            @csrf
                        </form>
                    </li>
                    
                </ul>
            </div>
            @endif
            @endauth
        </nav>
        <div id="app-root"></div>
        
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
