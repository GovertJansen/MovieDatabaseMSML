import React, { useState, useEffect, useRef } from 'react';
import { Menu, Card, Grid, Image } from 'semantic-ui-react';
import { Link } from '@inertiajs/react';

// WIP
const SearchBar = () => {
    // State to hold the current search term
    const [searchTerm, setSearchTerm] = useState('');
    // State to hold the debounced search term to avoid rapid API calls
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    // State to hold the search results
    const [results, setResults] = useState([]);
    // Ref to reference the results container
    const resultsRef = useRef(null);

    // Handle change in the search input field
    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
    };

    // Handle form submission
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (searchTerm) {
            fetchMovies(searchTerm);
        }
    };

    // Fetch movies from the API based on the search query
    const fetchMovies = (query) => {
        fetch(`/search?query=${query}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.movies) {
                    setResults(data.movies);
                } else {
                    setResults([]);
                }
            })
            .catch(err => console.error('Fetch error:', err));
    };

    // Debounce the search input to avoid rapid API calls
    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(delayInputTimeoutId);
    }, [searchTerm]);

    // Fetch movies whenever the debounced search term changes
    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchMovies(debouncedSearchTerm);
        } else {
            setResults([]);
        }
    }, [debouncedSearchTerm]);

    // Handle clicks outside the search results to close the dropdown
    const handleClickOutside = (event) => {
        if (resultsRef.current && !resultsRef.current.contains(event.target)) {
            setResults([]);
        }
    };

    // Add event listener to handle clicks outside the search results
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
            <Menu style={{ width: '100%', maxWidth: '600px', marginBottom: '1rem' }}>
                <Menu.Item style={{ width: '100%' }}>
                    {/* Search form */}
                    <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                        />
                    </form>
                </Menu.Item>
            </Menu>
            {/* Display search results */}
            {results.length > 0 && (
                <div
                    ref={resultsRef}
                    style={{
                        position: 'absolute',
                        top: '120px', // Adjust based on your navbar height
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '80%',
                        maxHeight: '800px', // Increased height
                        overflowY: 'auto',
                        background: 'white',
                        zIndex: 1000,
                        padding: '1rem',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        borderRadius: '8px',
                    }}>
                    <Grid columns={3} stackable centered verticalAlign="top" padded="vertically">
                        {results.map((displayData) => (
                            <Grid.Column key={displayData.id} style={{ padding: '0.5rem' }}>
                                <Card.Group>
                                    <Link href={`/movie/${displayData.id}`} style={{ display: 'flex', width: '100%' }}>
                                        <Card fluid style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
                                            <Image
                                                src={`https://image.tmdb.org/t/p/w92${displayData.poster_path}`}
                                                wrapped
                                                ui={false}
                                                style={{ height: '138px', width: '92px', objectFit: 'cover' }} // Adjust the image size
                                            />
                                            <Card.Content style={{ flex: '1 1 auto', padding: '0.5rem' }}>
                                                <Card.Header>{displayData.title}</Card.Header>
                                                <Card.Meta>
                                                    <span>Release Date: {displayData.release_date}</span>
                                                </Card.Meta>
                                                <Card.Meta>
                                                    <span>Rating: {displayData.vote_average}</span>
                                                </Card.Meta>
                                                <Card.Description>
                                                    {displayData.overview.slice(0, 150) + "..."}
                                                </Card.Description>
                                            </Card.Content>
                                        </Card>
                                    </Link>
                                </Card.Group>
                            </Grid.Column>
                        ))}
                    </Grid>
                </div>
            )}
        </div>
    );
}

export default SearchBar;
