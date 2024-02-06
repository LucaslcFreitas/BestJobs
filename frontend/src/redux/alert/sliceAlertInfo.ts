import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AlertInfo = {
    title: '',
    info: '',
    textButton: '',
    show: false,
    onDismiss: () => { }
};

interface AlertInfo {
    title: string;
    info: string;
    textButton: string;
    show: boolean;
    onDismiss: () => void;
}

const sliceAlertInfo = createSlice({
    name: 'AlertInfo',
    initialState: initialState,
    reducers: {
        showAlertInfo(state, { payload }: PayloadAction<AlertInfo>) {
            return payload;
        },
        hideAlertInfo() {
            return initialState;
        }
    }
});

export default sliceAlertInfo.reducer;
export const { showAlertInfo, hideAlertInfo } = sliceAlertInfo.actions;

export const useAlertInfo = (state: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    return state.alertInfo as AlertInfo;
};
