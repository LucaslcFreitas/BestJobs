import { configureStore } from '@reduxjs/toolkit';
import sliceUser from './user/sliceUser';
import sliceLoader from './loader/sliceLoader';
import sliceAlertInfo from './alert/sliceAlertInfo';
import sliceAlertConfirm from './alert/sliceAlertConfirm';

const store = configureStore({
    reducer: {
        user: sliceUser,
        loader: sliceLoader,
        alertInfo: sliceAlertInfo,
        alertConfirm: sliceAlertConfirm
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store;
