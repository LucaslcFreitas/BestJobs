import { configureStore } from '@reduxjs/toolkit';
import sliceUser from './user/sliceUser';
import sliceLoader from './loader/sliceLoader';

const store = configureStore({
    reducer: {
        user: sliceUser,
        loader: sliceLoader
    }
});

export default store;