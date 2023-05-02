import { configureStore } from '@reduxjs/toolkit';

import roleSlice from '../reducers/login';

const store = configureStore({
    reducer: {
        role: roleSlice,
    },
});

export default store;
