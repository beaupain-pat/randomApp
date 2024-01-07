import store from '../../../redux/store';
import {fetchActivity, setFavoriteActivity, setSelectedFilter} from "../../../redux/slice/activitySlice";

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

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(MOCK_ACTIVITY)
}));


describe('activitySlice state tests', () => {
    it('should set initial data', () => {
        const state = store.getState().activity.data;
        expect(state).toEqual({});
    });

    it('should be able to fetch an activity', async () => {
        const result = await store.dispatch(fetchActivity());
        const activity = result.payload;
        expect(result.type).toBe('fetchActivity/fulfilled');
        expect(activity).toEqual(MOCK_ACTIVITY);

        const state = store.getState().activity.data;
        expect(state).toEqual(MOCK_ACTIVITY);
    });

    it('should be able to set a filter', async () => {
        await store.dispatch((setSelectedFilter('diy')));
        const state = store.getState().activity.selectedFilter;
        expect(state).toEqual('diy');
    });

    it('should be able to favorite a card', async () => {
        let state = store.getState().activity.favoriteActivities;
        expect(state).toStrictEqual([]);
        await store.dispatch((setFavoriteActivity(MOCK_ACTIVITY)));
        state = store.getState().activity.favoriteActivities;
        expect(state).toEqual([{...MOCK_ACTIVITY}]);
    });

    it('should be able to reomve a favorite card', async () => {
        let state = store.getState().activity.favoriteActivities;
        expect(state).toStrictEqual([{...MOCK_ACTIVITY}]);
        await store.dispatch((setFavoriteActivity(MOCK_ACTIVITY)));
        state = store.getState().activity.favoriteActivities;
        expect(state).toEqual([]);
    });
})