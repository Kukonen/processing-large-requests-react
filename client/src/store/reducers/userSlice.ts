import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import UserService, {User} from '../../service/userService';

export interface UserState {
    currentUser: User | undefined;
}

const initialState: UserState = {
    currentUser: undefined 
};

export const getUserAsync = createAsyncThunk(
    'user/getUsers',
    async () => {
        const response = await UserService.getUsers();
        return response;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
        },
    }
});

export const { setCurrentUser } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => {
    return state.users.currentUser;
};

export default userSlice.reducer;