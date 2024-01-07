import React from 'react';
import { render } from '@testing-library/react-native';
import {FavoriteButton} from "../../../components/favoriteButton/favoriteButton";

describe('Favorite button tests', () => {
    it('should render the checkbox without being checked', () => {
        const { getByTestId } = render(
            <FavoriteButton onPress={() => jest.fn()} isSelected={false} />,
        );
        const id = getByTestId("favorite-button");
        expect(id).toBeTruthy();
    });
});