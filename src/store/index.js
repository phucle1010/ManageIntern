import { configureStore } from '@reduxjs/toolkit';

import permissionSlice from '../reducers/permission';
import userSlice from '../reducers/user';

const store = configureStore({
    reducer: {
        role: permissionSlice,
        user: userSlice,
    },
});

export default store;
