import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Movie } from '@/types'; // Import the Movie type

const SearchMovies = () => {
    const [query, setQuery] = useState<string>(''); // Store search query
    const [results, setResults] = useState<Movie[]>([]); // Store search results
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state
    const router = useRouter(); // Use the router to navigate to movie detail page

    const searchMovies = async () => {
        if (!query.trim()) return; // Do nothing if the search query is empty
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=8897d6373a8d096f760008eabb6376ef&query=${query}`
            );
            const data = await response.json();
            console.log(data)
            if (!response.ok) throw new Error('Error fetching search results');
            setResults(data.results);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const renderMovieItem = ({ item }: { item: Movie }) => (
        <TouchableOpacity onPress={() => router.push(`/moviedetail?id=${item.id}`)}>
            <View style={styles.movieItem}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
                    style={styles.movieImage}
                />
                <Text style={styles.movieTitle}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search for a movie..."
                value={query}
                onChangeText={setQuery}
            />
            <Button title="Search" onPress={searchMovies} />

            {loading && <Text style={styles.loading}>Loading...</Text>}
            {error && <Text style={styles.error}>{error}</Text>}

            <FlatList
                data={results}
                renderItem={renderMovieItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.movieList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        color: '#fff',
        marginBottom: 10,
        paddingHorizontal: 8,
    },
    loading: {
        textAlign: 'center',
        marginVertical: 10,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginVertical: 10,
    },
    movieList: {
        marginTop: 10,
        width: '100%'
    },
    movieItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%'
    },
    movieImage: {
        width: 50,
        height: 75,
        marginRight: 10,
    },
    movieTitle: {
        fontSize: 16,
        color: '#fff'
    },
});

export default SearchMovies;
