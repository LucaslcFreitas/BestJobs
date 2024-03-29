import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: User = {
    token: null,
    name: null,
    email: null,
    type: null
};

interface User {
    token: string | null,
    name: string | null,
    email: string | null,
    type: 'Candidate' | 'Company' | null
}

const sliceUser = createSlice({
    name: 'User',
    initialState: initialState,
    reducers: {
        userLogin(state, { payload }: PayloadAction<User>) {
            return payload;
        },
        userLogout() {
            return initialState;
        }
    }
});

export default sliceUser.reducer;
export const { userLogin, userLogout } = sliceUser.actions;

export const useUser = (state: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    return state.user as User;
};
