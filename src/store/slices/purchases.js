import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../../public/utils/config";

import { setIsLoading } from "./isLoading.slice";

export const purchases = createSlice({
    name: "purchases",
    initialState: [],
    reducers: {
        setPurchases: (state, action) => {
            return action.payload;
        }
    }
});

export const getPurchises = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .get('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', getConfig())
        .then(res => dispatch(setPurchases(res.data.data.purchases)))
        .catch(err => console.log(err))
        .finally(() => dispatch(setIsLoading(false)))
};

export const { setPurchases } = purchases.actions;
export default purchases.reducer;