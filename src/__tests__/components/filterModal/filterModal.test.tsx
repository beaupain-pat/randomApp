import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {Provider} from "react-redux";
import store from "../../../redux/store";
import FilterModal from "../../../components/filterModal/filterModal";

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
describe('Filter modal tests', () => {
    it('should render the filterModal when modalVisible is true', () => {
        const {getByText} = render(
            <Provider store={store}>
                <FilterModal modalVisible={true}/>
            </Provider>,
        );
        const label = getByText("education");
        expect(label).toBeTruthy();
    });

    it('should apply the filter', async () => {
        const {getByTestId} = render(
            <Provider store={store}>
                <FilterModal modalVisible={true}/>
            </Provider>,
        );
        await fireEvent.press(getByTestId("checkbox-education"));
        let state = store.getState().activity.selectedFilter;
        expect(state).toBe("education");
        await fireEvent.press(getByTestId("apply-button"));
        state = store.getState().app.modalVisible;
        expect(state).toBe(false);
    });

    it('should clear the filter when already selected', async () => {
        const {getByTestId} = render(
            <Provider store={store}>
                <FilterModal modalVisible={true}/>
            </Provider>,
        );
        let state = store.getState().activity.selectedFilter;
        expect(state).toBe('education');
        await fireEvent.press(getByTestId("checkbox-education"));
        state = store.getState().activity.selectedFilter;
        expect(state).toBe('');
    });

    it('clear the filter', async () => {
        const {getByTestId} = render(
            <Provider store={store}>
                <FilterModal modalVisible={true}/>
            </Provider>,
        );
        await fireEvent.press(getByTestId("checkbox-education"));
        let state = store.getState().activity.selectedFilter;
        expect(state).toBe('education');
        await fireEvent.press(getByTestId("clear-button"));
        state = store.getState().activity.selectedFilter;
        expect(state).toBe('');
    });


    it('closes the modal', async () => {
        const {getByTestId} = render(
            <Provider store={store}>
                <FilterModal modalVisible={true}/>
            </Provider>,
        );
        await fireEvent.press(getByTestId("close-button"));
        let state = store.getState().app.modalVisible;
        expect(state).toBe(false);
    });
});