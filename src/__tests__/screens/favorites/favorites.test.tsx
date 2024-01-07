import React from 'react';
import {render} from '@testing-library/react-native';
import {Favorites} from "../../../screens/favorites/favorites";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import {thunk} from "redux-thunk";

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const MOCK_ACTIVITY = {
    "activity": "Learn Express.js",
    "accessibility": 0.25,
    "type": "education",
    "participants": 1,
    "price": 0.1,
    "key": 3943506
}

const middlewares = [thunk];
// @ts-ignore
const mockStore = configureMockStore(middlewares);
describe('favorite screen test', () => {
    it('should render the favorite screen without favorites', () => {
        const store = mockStore({
            activity: {
                data: MOCK_ACTIVITY,
                favoriteActivities: []
            },
        })
        const {getByText} = render(
            <Provider store={store}>
                <Favorites/>
            </Provider>,
        );
        const label = getByText("No favorites yet!");
        expect(label).toBeTruthy();
    });

    it('should render the favorite screen with favorites', () => {
        const store = mockStore({
            activity: {
                data: MOCK_ACTIVITY,
                favoriteActivities: [{...MOCK_ACTIVITY}]
            },
        })
        const {getByText} = render(
            <Provider store={store}>
                <Favorites/>
            </Provider>,
        );
        const label = getByText("Learn Express.js");
        expect(label).toBeTruthy();
    });
})
