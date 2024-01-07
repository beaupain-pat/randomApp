import store from '../../../redux/store';
import {toggleModal} from "../../../redux/slice/appSlice";
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
describe('appSlice state tests', () => {
    it('should set initial data', () => {
        const state = store.getState().app.modalVisible;
        expect(state).toEqual(false);
    });
    it('should set the modal to visible when toggled', async () => {
        const result = await store.dispatch(toggleModal(true));
        const activity = result.payload;
        expect(activity).toEqual(true);
        const state = store.getState().app.modalVisible;
        expect(state).toEqual(true);
    });
    it('should set the modal to invisible when toggled again', async () => {
        let state = store.getState().app.modalVisible;
        expect(state).toStrictEqual(true);
        await store.dispatch((toggleModal(!state)));
        state = store.getState().app.modalVisible;
        expect(state).toEqual(false);
    });
})