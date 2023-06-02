import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            return action.payload;
        },
    },
});

const { actions, reducer } = userSlice;
export const { setUserInfo } = actions;
export default reducer;
