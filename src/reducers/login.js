import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    role: 0,
};

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        setRole: (state, action) => {
            // console.log('prev state: ', state);
            // state = action.payload;
            // console.log('next state: ', state);
            return action.payload;
        },
    },
});

const { actions, reducer } = roleSlice;
export const { setRole } = actions;
export default reducer;
