import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Grid, Card } from 'semantic-ui-react';
import SearchBar from '@/Searchbar/searchBar';

export default function Dashboard({ auth }) {
    // Extract movies from the page props using usePage hook
    const { movies } = usePage().props;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            {/* Main container with flex display to center the content */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <SearchBar />

                {/* Loop through the popular movies and display each one in a Card component */}
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
        </AuthenticatedLayout>
    );
}
