import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AlertConfirm = {
    title: '',
    info: '',
    textButtonCancel: '',
    textButtonConfirm: '',
    show: false,
    onDismiss: () => { },
    onConfirm: () => { },
};

interface AlertConfirm {
    title: string;
    info: string;
    textButtonCancel: string;
    textButtonConfirm: string;
    show: boolean;
    onDismiss: () => void;
    onConfirm: () => void;
}


const sliceAlertConfirm = createSlice({
    name: 'AlertConfirm',
    initialState: initialState,
    reducers: {
        showAlertConfirm(state, { payload }: PayloadAction<AlertConfirm>) {
            return payload;
        },
        hideAlertConfirm() {
            return initialState;
        }
    }
})

export default sliceAlertConfirm.reducer;
export const { showAlertConfirm, hideAlertConfirm } = sliceAlertConfirm.actions;

export const useAlertConfirm = (state: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    return state.alertConfirm as AlertConfirm;
};
