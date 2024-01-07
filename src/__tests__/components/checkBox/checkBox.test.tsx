import React from 'react';
import { render } from '@testing-library/react-native';
import {CheckBox} from "../../../components/checkBox/checkBox";

describe('checkbox tests', () => {
    it('should render the checkbox without being checked', () => {
        const { getByText } = render(
            <CheckBox onPress={() => {}} selectedValue={''} value={'test'}/>,
        );
        const label = getByText("test");
        expect(label).toBeTruthy();
    });

    it('should render the checkbox being checked', () => {
        const { getByText } = render(
            <CheckBox onPress={() => {}} selectedValue={'test'} value={'test'}/>,
        );
        const label = getByText("test");
        expect(label).toBeTruthy();
    });
})