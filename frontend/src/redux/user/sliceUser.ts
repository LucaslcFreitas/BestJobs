import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: User = {
    token: 'teste',
    name: null,
    email: null,
    type: null
};

interface User {
    token: string | null,
    name: string | null,
    email: string | null,
    type: string | null
}

const sliceUser = createSlice({
    name: 'User',
    initialState: initialState,
    reducers: {
        userLoginLogout(state, { payload }: PayloadAction<User>) {
            return payload;
        }
    }
});

export default sliceUser.reducer;
export const { userLoginLogout } = sliceUser.actions;

export const useUser = (state: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    return state.user as User;
};
