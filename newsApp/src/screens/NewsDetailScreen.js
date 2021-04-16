import React from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import {MaterialIcons} from 'react-native-vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import * as newsAction from '../redux/actions/newsAction';

const NewsDetailScreen = (props) => { 

    const dispatch = useDispatch();

    const {articleUrl} = props.route.params;
    const article = useSelector(state => state.news.articles.articles.find(article => article.url === articleUrl))
    console.log(article);

    const isFav = useSelector((state) => state.news.favorites.some((articleItem => articleItem.url === article.url))); 

    return(
        <View style={styles.container}>
            <View style={styles.heading}>
                <Text style={styles.title}>{article.title}</Text>
            </View>
            <View style={styles.authorContainer}>
                <ImageBackground source={{uri: article.urlToImage}} style={styles.image}>
                    <Text style={styles.author}>{article.author}</Text>
                    <MaterialIcons //change icon depending on value of isFav
                        name={isFav ? 'favorite' : 'favorite-border'} 
                        color="#72bcd4" size={24}
                        onPress={() => {
                            //dipatch action
                            dispatch(newsAction.toggleFavorites(article.url));
                        }}
                    />
                </ImageBackground>
            </View>
            <View style={styles.description}>
                <Text style={styles.descriptionText}>{article.description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
    },
    heading: {
      marginHorizontal: 20,
      marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 210,
        justifyContent: 'space-between'
    },
    authorContainer: {
        backgroundColor:'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    author: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 20,
        color: 'white',
    },
    title: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 20,
    },
    description:{
        fontFamily: 'Ubuntu',
        fontSize: 20,
    },
    descriptionContainer: {
        margin: 10,
    }
});

export default NewsDetailScreen;