<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title inertia>{{ config('app.name', 'Authentic Rwanda') }}</title>
            <meta name="description" content="Discover and book authentic Rwandan experiences led by verified local guides. Explore culture, nature, and community-driven tours in the Land of a Thousand Hills.">
            
            <!-- Open Graph / Facebook -->
            <meta property="og:type" content="website">
            <meta property="og:title" content="Authentic Rwanda - Local Guided Experiences">
            <meta property="og:description" content="Book unique tours and community experiences in Rwanda. Support local guides and discover the heart of Africa.">
            <meta property="og:image" content="https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?q=80&w=1200&auto=format&fit=crop">
        </x-inertia::head>

        <link rel="preconnect" href="https://fonts.bunny.net">
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
