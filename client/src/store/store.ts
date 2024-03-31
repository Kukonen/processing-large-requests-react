import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';

export const store = configureStore({
    reducer: {
        users: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
