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
        // Retrieve the API key from environment variables
        $apiKey = env('AUTHORIZATION_API_TMDB');

        // Fetch popular movies from the API
        $response = Http::withHeaders([
            'accept' => 'application/json',
            'Authorization' => 'Bearer ' . $apiKey
        ])->get("https://api.themoviedb.org/3/movie/popular?language=en-US&api_key={$apiKey}");

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

    // WIP / returns movies []
    public function search(Request $request)
    {
        try {
            // Retrieve the API key from environment variables
            $apiKey = env('AUTHORIZATION_API_TMDB');
            $query = $request->input('query');

            // Fetch search results from the API
            $response = Http::withHeaders([
                'accept' => 'application/json',
                'Authorization' => 'Bearer ' . $apiKey
            ])->get("https://api.themoviedb.org/3/search/movie?query={$query}&include_adult=false&language=en-US");

            // Check if the response is successful
            if ($response->successful()) {
                $movies = $response->json()['results'];
            } else {
                $movies = [];
            }

            // Return the search results as JSON
            return response()->json(['movies' => $movies]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to fetch search results'], 500);
        }
    }
}
