import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../../public/utils/config";

import { setIsLoading } from "./isLoading.slice";

export const card = createSlice({
    name: "card",
    initialState: [],
    reducers: {
        getCard: (state, action) => {
            return action.payload;
        }
    }
});

export const getProductCar = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
        .then(res => { console.log(res); dispatch(getCard(res.data.data.cart.products))})
        .catch(err => console.log(err))
        .finally(() => dispatch(setIsLoading(false)))
};

export const setProductCar= (data) => (dispatch) => {
    console.log(data);
    dispatch(setIsLoading(true));
        return axios
        .post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', data , getConfig())
        .then(results => {
            console.log(results);
        })
        .catch(err => console.log(err))
        .finally(() => dispatch(setIsLoading(false)))
        
};


export const { getCard } = card.actions;
export default card.reducer;