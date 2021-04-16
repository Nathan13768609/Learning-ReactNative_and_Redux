import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native';
import {MaterialIcons} from 'react-native-vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import * as newsAction from '../redux/actions/newsAction';
//import { Ionicons } from '@expo/vector-icons';

const Card = (props) => {

    const dispatch = useDispatch(); //dispatch is used to initiate an action (send data to the redux state object).
    //does the item exist in favorites??
    const isFav = useSelector((state) => state.news.favorites.some((article => article.url === props.url)));     //Selector is used to access the state 
                                                                                                                //  object and retrieve data. 
                                                                                                                //The JS some() function returns true or false.
                                                                                                                //.some() iterates through the favorites array
                                                                                                                //  and performs a function on each item to assess
                                                                                                                //  a true or false value. If all are true, true is 
                                                                                                                //  returned. If at least 1 is false, 
                                                                                                                //  false is returned.
    return(
        // <TouchableOpacity onPress={() => {props.navigation.navigate('NewsDetails')}}>
            //the navigate() function takes two params; (routeName, {params to be passed when the screen is laoded}) 
            //  the params can be retrieved using navigate.getParam (like in NewsDetailScreen.js)
        <TouchableOpacity onPress={() => {
            props.navigation.navigate('NewsDetails', {
                    articleUrl: props.url
            })
        }}>
            <View style={styles.card}>
                <View style={styles.imageWrapper}>
                    <Image 
                            // source={require('../../assets/news-demo.jpg')} 
                            //source={{uri: 'https://user-images.githubusercontent.com/16916934/27370350-c82d1c44-5679-11e7-9147-2e8adeb4c515.png'}}
                        // check an image exists
                        source={{uri: props.image ? props.image : 'https://user-images.githubusercontent.com/16916934/27370350-c82d1c44-5679-11e7-9147-2e8adeb4c515.png'}}
                        style={styles.image}
                    />
                </View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>
                        {/* check a title exists and then check its length */}
                        {props. title && props.title.length > 25 ? props.title.slice(0, 25) + '...' : props.title}
                    </Text>
                    <MaterialIcons //change icon depending on value of isFav
                        name={isFav ? 'favorite' : 'favorite-border'} 
                        color="#72bcd4" size={24}
                        onPress={() => {
                            //dipatch action
                            dispatch(newsAction.toggleFavorites(props.url));
                        }}
                    />
                    {/* <Ionicons name="home" size={24} color="black" /> */}
                </View>
                <View style={styles.descriptionWrapper}>
                    <Text style={styles.description}>
                        {/* check a description exists and then check its length */}
                        {props.description.length > 150 ? props.description.slice(0, 140) + '...' : props.description}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        height: 300,
        margin: 20,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5
    },
    imageWrapper: {
      width: '100%',
      height: '60%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      overflow: 'hidden'
    },
    image: {
        height: '100%',
        width: '100%'
    },
    titleWrapper: {
        height: '10%',
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    title: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 20,
    },
    description:{
        fontFamily: 'Ubuntu',
        fontSize: 15,
        marginTop: 10
    },
    descriptionWrapper: {
        paddingHorizontal: 15
    }
});

export default Card;