<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>E-MANAJEMEN SERTIFIKAT AKREDITASI</title>
    </head>
    <body style="background-color: #EDF2F7;">
        <div id="home"></div>
        <script src="{{ asset('js/app.js') }}"></script>
        @env('local')
        <script src="http://localhost:35729/livereload.js"></script>
        @endenv
    </body>
</html>

