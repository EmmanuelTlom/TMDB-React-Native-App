import React from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import MovieItem from './MovieItem';
import { Movie } from '../types';

interface MovieListProps {
    movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    const renderItem = ({ item }: ListRenderItemInfo<Movie>) => (
        <MovieItem movie={item} />
    );

    return (
        <FlatList
            data={movies}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ padding: 10 }}
        />
    );
};

export default MovieList;
