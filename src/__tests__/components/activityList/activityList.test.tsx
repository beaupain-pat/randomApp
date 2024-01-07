import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from "react-redux";
import store from "../../../redux/store";
import {ActivityList} from "../../../components/activityList/activityList";

const MOCK_ACTIVITY_LIST = [
    {
        "activity": "Learn Express.js",
        "accessibility": 0.25,
        "type": "education",
        "participants": 1,
        "price": 0.1,
        "key": 3943506
    },
    {
        "activity": "Learn a new programming language",
        "accessibility": 0.25,
        "type": "education",
        "participants": 1,
        "price": 0.1,
        "key": 3943502
    },
    {
        "activity": "Learn how to play a new sport",
        "accessibility": 0.25,
        "type": "education",
        "participants": 1,
        "price": 0.1,
        "key": 3943508
    },
]

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);




describe('Activity list tests', () => {
    it('should render the activityList', () => {
        const {getByText} = render(
            <Provider store={store}>
                <ActivityList data={MOCK_ACTIVITY_LIST} />
            </Provider>,
        );
        const label = getByText("Learn Express.js");
        expect(label).toBeTruthy();
    });
});