import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

const API_URL = 'http://www.boredapi.com/api';

export type ActivityItem = {
    activity: string,
    accessibility: number,
    type: string,
    participants: number,
    price: number,
    key: number,
}

export const fetchActivity = createAsyncThunk("fetchActivity", async (arg, {getState}) => {
    const state = <RootState>getState();
    const selectedFilter = state.activity.selectedFilter;
    const endpointUrl = `${API_URL}/activity${selectedFilter !== '' ? `?type=${selectedFilter}` : ''}`;
    const res = await fetch(endpointUrl);
    return res?.json();
});

const activitySlice = createSlice({
    name: 'activity',
    initialState: {
        isLoading: <boolean>false,
        data: <ActivityItem>{},
        isError: <boolean>false,
        selectedFilter: <string>'',
        favoriteActivities: <ActivityItem[]>[]
    },
    reducers: {
        setSelectedFilter: (state, action: PayloadAction<string>) => {
            state.selectedFilter = action.payload;
        },
        setFavoriteActivity: (state, action: PayloadAction<ActivityItem>) => {
            let newFavoriteActivities = [...state.favoriteActivities];
            let index = newFavoriteActivities.findIndex(item => item.key === action.payload.key);
            if (index !== -1) {
                newFavoriteActivities.splice(index, 1);
                return {
                    ...state,
                    favoriteActivities: newFavoriteActivities
                }
            }
            newFavoriteActivities.push(action.payload);
            return {
                ...state,
                favoriteActivities: newFavoriteActivities
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchActivity.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchActivity.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchActivity.rejected, (state, action) => {
            state.isError = true;
        });
    }
});

export const {setSelectedFilter, setFavoriteActivity} = activitySlice.actions;

export default activitySlice.reducer;