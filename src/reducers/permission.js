import { createSlice } from '@reduxjs/toolkit';

const initialState = 0;

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        setRole: (state, action) => {
            return action.payload;
        },
    },
});

const { actions, reducer } = roleSlice;
export const { setRole } = actions;
export default reducer;
