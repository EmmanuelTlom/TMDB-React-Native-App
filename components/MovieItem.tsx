import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Movie } from '../types';
import { useRouter } from 'expo-router';

interface MovieItemProps {
    movie: Movie;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
    const router = useRouter();

    const handlePress = () => {
        // Navigate to the correct route format
        router.push({
            pathname: '/moviedetail',  // Correct route based on your folder structure
            params: { id: movie.id },
        });
    };

    return (
        <Pressable onPress={handlePress} style={styles.container}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                style={styles.image}
            />
            <Text style={styles.title}>{movie.title}</Text>
            <Text numberOfLines={2} style={styles.overview}>
                {movie.overview}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 200,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        padding: 8,
    },
    overview: {
        padding: 8,
        color: '#666',
    },
});

export default MovieItem;
