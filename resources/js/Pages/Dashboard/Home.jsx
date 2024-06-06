import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Grid, Card } from "semantic-ui-react";
// import { searchBar } from 'resources/js/Searchbar/searchBar';

export default function Dashboard({ auth }) {
    const { movies } = usePage().props;

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* <searchBar /> */}
            {movies.map((movie) => (
                <div key={movie.id} style={{ flex: '0 0 25%', boxSizing: 'border-box', padding: '10px' }}>
                    <Card
                        image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        header={movie.original_title}
                        meta={`Release Date: ${movie.release_date} | Rating: ${movie.vote_average}`}
                        description={movie.overview}
                    />
                </div>
            ))}
        </div>
    );
}
