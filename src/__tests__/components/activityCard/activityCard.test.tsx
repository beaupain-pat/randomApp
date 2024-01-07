import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {ActivityCard} from "../../../components/activityCard/activityCard";
import {Provider} from "react-redux";
import store from "../../../redux/store";

const MOCK_ACTIVITY = {
    "activity": "Learn Express.js",
    "accessibility": 0.25,
    "type": "education",
    "participants": 1,
    "price": 0.1,
    "key": 3943506
}

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);


const initialState = {
    activity: {
        data: MOCK_ACTIVITY,
        favoriteActivities: []
    }
}

const updatedState = {
    activity: {
        data: MOCK_ACTIVITY,
        favoriteActivities: [{...MOCK_ACTIVITY}]
    }
}

describe('Activity card tests', () => {
    it('should render the activityCard', () => {
        const {getByText} = render(
            <Provider store={store}>
                <ActivityCard data={MOCK_ACTIVITY} reFetchActivity={false}/>
            </Provider>, {initialState}
        );
        const label = getByText("Learn Express.js");
        expect(label).toBeTruthy();
    });
    it('should set the activity as a favorite when button is pressed', () => {
        const {getByTestId} = render(
            <Provider store={store}>
                <ActivityCard data={MOCK_ACTIVITY} reFetchActivity={false}/>
            </Provider>, {initialState}
        );
        fireEvent.press(getByTestId('favorite-button'));
        const state = store.getState().activity.favoriteActivities;
        expect(state).toEqual([{...MOCK_ACTIVITY}]);
    });
    it('should remove the activity as a favorite when button is pressed again', () => {
        const {getByTestId} = render(
            <Provider store={store}>
                <ActivityCard data={MOCK_ACTIVITY} reFetchActivity={false}/>
            </Provider>, {updatedState}
        );
        fireEvent.press(getByTestId('favorite-button'));
        const state = store.getState().activity.favoriteActivities;
        expect(state).toEqual([]);
    });
    it('should refetch an activity when favorite button is pressed', async () => {
        const {getByTestId} = render(
            <Provider store={store}>
                <ActivityCard data={MOCK_ACTIVITY} reFetchActivity={true}/>
            </Provider>, {initialState}
        );
        await fireEvent.press(getByTestId('favorite-button'));
        const state = store.getState().activity.favoriteActivities;
        expect(state).toEqual([{...MOCK_ACTIVITY}]);
    });
});