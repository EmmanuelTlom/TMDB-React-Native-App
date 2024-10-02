import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Movie } from '@/types'; // Ensure you have the correct import for your Movie type

const MovieDetail = () => {
    const router = useRouter();
    console.log(router)
    const { id } = { id: 1 }; // Access the ID from the query parameters
    // const { id } = router.query; // Access the ID from the query parameters

    // Fetch movie details based on ID
    const [movie, setMovie] = React.useState<Movie | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_TMDB_API_KEY&language=en-US`);
                if (!response.ok) throw new Error('Failed to fetch movie details');
                const data = await response.json();
                setMovie(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchMovieDetails(); // Fetch only if id exists
        }
    }, [id]);

    if (loading) {
        return (
            <View style={styles.center}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
                style={styles.image}
            />
            <Text style={styles.title}>{movie?.title}</Text>
            <Text style={styles.overview}>{movie?.overview}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 8,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginVertical: 8,
    },
    overview: {
        fontSize: 16,
        color: '#666',
    },
});

export default MovieDetail;
