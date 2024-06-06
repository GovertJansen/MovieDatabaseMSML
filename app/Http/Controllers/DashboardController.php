<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        // Fetch movies from the API
        $response = Http::withHeaders([
            'accept' => 'application/json',
            'Authorization' => 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjFkOWEzZjkwMmI5YTg5MDEwMzQxMTc1N2IzZmVkOSIsInN1YiI6IjY2NTVlODBkMzljNjllZGZkN2U0YmRlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iRY7v-s_RMNitwzNsHJ6JsvxCrZlapPlSTswRYySWVc'
        ])->get('https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=6f1d9a3f902b9a890103411757b3fed9');

        // Check if the response is successful
        if ($response->successful()) {
            $movies = $response->json()['results'];
        } else {
            $movies = [];
        }

        // Pass the movies data to the Inertia view
        return Inertia::render('Dashboard/Home', [
            'movies' => $movies,
        ]);
    }
}
