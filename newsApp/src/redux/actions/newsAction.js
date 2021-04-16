// The reducer holds the functionality behind each state type.
//  the action object simply specifies which state types functinality should be executed.
//  payload data or any other data can also be attached to this object.

export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const TOGGLE_FAVORITES = 'TOGGLE_FAVORITES';

export const fetchArticles = () => {
    return async dispatch => {

        // logic to fetch news data
        const result = await fetch('https://newsapi.org/v2/everything?q=apple&from=2021-03-21&to=2021-03-21&sortBy=popularity&apiKey=c3806e7e43df4b5fbd4c457825febf1e');

        const resultData = await result.json();

        dispatch({
            type: FETCH_ARTICLES,
            payload: resultData
        });
    }
}

export const toggleFavorites = (url) => {
    return {
        type: TOGGLE_FAVORITES,
        payload: url
    }
}