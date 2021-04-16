import React, { useEffect } from 'react';
import {StyleSheet, FlatList, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Card from '../components/Card';
import * as newsAction from '../redux/actions/newsAction';

const NewsListScreen = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(newsAction.fetchArticles())
    }, [dispatch]);

    const articles = useSelector((state) => state.news.articles);   //useSelector passes state as a param //the state.news is the name of a reducer set in store.js. state.news.articles is the 
    //console.log(articles.articles);

    return(
        <FlatList
            data={articles.articles}    //only extract the articles array from the articles object
            keyExtractor={(item) => item.url}  //unique key
            renderItem={({item}) => (
                <Card 
                    navigation={props.navigation} 
                    title={item.title}
                    author={item.author}
                    image={item.urlToImage}
                    description={item.description}
                    url={item.url}
                />  //
            )}
        />
    );
}

const styles = StyleSheet.create({

});

export default NewsListScreen;