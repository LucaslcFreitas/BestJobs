import { configureStore } from '@reduxjs/toolkit';
import sliceUser from './user/sliceUser';

const store = configureStore({
    reducer: {
        user: sliceUser
    }
});

export default store;