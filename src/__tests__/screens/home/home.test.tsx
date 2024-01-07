import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import {Home} from "../../../screens/home/home";
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
const mockStore = configureMockStore(middlewares);
describe('home screen test', () => {
    it('should render the home screen', () => {
        const store = mockStore({
            activity: {
                data: MOCK_ACTIVITY,
                isLoading: false,
                isError: false,
                favoriteActivities: []
            },
            app: {
                toggleModal: false
            }
        })
        const {getByText} = render(
            <Provider store={store}>
                <Home/>
            </Provider>,
        );
        const label = getByText("Learn Express.js");
        expect(label).toBeTruthy();
    });

    it('should show the loader', () => {
        const store = mockStore({
            activity: {
                data: {},
                isLoading: true,
                isError: false,
                favoriteActivities: []
            },
            app: {
                toggleModal: false
            }
        })
        const {getByTestId} = render(
            <Provider store={store}>
                <Home/>
            </Provider>,
        );
        const element = getByTestId("loader");
        expect(element).toBeTruthy();
    });
    it('should show an error', () => {
        const store = mockStore({
            activity: {
                data: {},
                isLoading: false,
                isError: true,
                favoriteActivities: []
            },
            app: {
                toggleModal: false
            }
        })
        const {getByText} = render(
            <Provider store={store}>
                <Home/>
            </Provider>,
        );
        const label = getByText("Oops, something went wrong...");
        expect(label).toBeTruthy();
    });
})
