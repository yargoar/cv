import { createSlice } from '@reduxjs/toolkit';

interface CVState {
    data: any;
    loading: boolean;
    error: string | null;
}

const initialState: CVState = {
    data: {},
    loading: false,
    error: null,
};

const cvSlice = createSlice({
    name: 'cv',
    initialState,
    reducers: {
        setCVData: (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state) => {
            state.loading = true;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { setCVData, setLoading, setError } = cvSlice.actions;
export default cvSlice.reducer;