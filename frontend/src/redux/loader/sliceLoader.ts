import { createSlice } from '@reduxjs/toolkit';

const initalState: boolean = false;

const sliceLoader = createSlice({
    name: 'Loader',
    initialState: initalState,
    reducers: {
        startLoad() {
            return true;
        },
        stopLoad() {
            return false;
        }
    }
});

export default sliceLoader.reducer;
export const { startLoad, stopLoad } = sliceLoader.actions;

export const useLoader = (state: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    return state.loader as boolean;
};
