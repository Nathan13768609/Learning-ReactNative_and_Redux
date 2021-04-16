// The Reducer handles the functionality (ie: the changing of the state) when a type from the action object is dispatched.
//  Note: the state is never modified. When there is a change to a state, a new state instance is created. By using { ...state, attToChange: newVal },
//  we create a new state instance that is a copy of the previouse state, with only the specified attribue (attToChange) given a new value (newVal).

import { FETCH_ARTICLES, TOGGLE_FAVORITES } from "../actions/newsAction";

const defaultState = {
    articles: [],
    favorites: [],
}

export default function(state=defaultState, action) {   //this fucntion is identified as a Reducer in store.js -- all reducers have access to all actions
                                                        //Syntax of state=initialState => if a state is passed into the function then use that state,
                                                        //  otherwise use defaultState.
    switch(action.type) { 
        default:
            return state;

        case FETCH_ARTICLES:
            return{
                ...state,
                articles: action.payload,
            }

        case TOGGLE_FAVORITES:
            //Add or remove item from favorites
            const index = state.favorites.findIndex(article => article.url === action.payload); //js findIndex fucntion iterates over articels array and if condition is true the index is returned and if nmot true for any index -1 is returned

            if(index >= 0) {    //item exists in favorites
                //remove
                const favorites = [...state.favorites]; // creates a copy of favorites array in the state
                favorites.splice(index, 1)  //(index of items to remove, number of items to remove)

                return {
                    ...state,
                    favorites: favorites
                }
            } else {    //item does not exist in favorites
                //add
                const article = state.articles.articles.find(article => article.url === action.payload);    //articles array inside the articals object

                return {
                    ...state,
                    favorites: state.favorites.concat(article)  //concat adds the article to the favorites array
                }
            }
    }
}