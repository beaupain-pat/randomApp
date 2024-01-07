import React from 'react';
import {
    Text,
    View,
    Modal,
    Button,
    SafeAreaView,
    TouchableOpacity, StyleSheet,
} from 'react-native';
import {fetchActivity, setSelectedFilter} from "../../redux/slice/activitySlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {toggleModal} from "../../redux/slice/appSlice";
import {Ionicons} from "@expo/vector-icons";
import {CheckBox} from "../checkBox/checkBox";

type FilterModalProps = {
    modalVisible: boolean;
};

const filterTypes = [
    "education",
    "recreational",
    "social",
    "diy",
    "charity",
    "cooking",
    "relaxation",
    "music",
    "busywork"
];

const FilterModal = ({modalVisible}: FilterModalProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const selectedFilter = useSelector((state: RootState) => state.activity.selectedFilter);

    const fetchAndToggle = async () => {
        await dispatch(fetchActivity());
        await dispatch(toggleModal(!modalVisible));
    }

    const clearAndToggle = async () => {
        await dispatch(setSelectedFilter(''));
        await dispatch(fetchActivity());
        await dispatch(toggleModal(!modalVisible));
    }

    const handleOnPress = (value: string) => {
        if (value === selectedFilter) return dispatch(setSelectedFilter(''));
        dispatch(setSelectedFilter(value));
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Select filter</Text>
                    <TouchableOpacity testID="close-button" onPress={() => fetchAndToggle()}>
                        <Ionicons name='close' size={24}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.modalOptions}>
                    {filterTypes.map(filter => (
                        <CheckBox
                            key={filter}
                            value={filter}
                            onPress={() => handleOnPress(filter)}
                            selectedValue={selectedFilter}
                        />
                    ))}
                </View>
                <View style={styles.modalActions}>
                    <View style={styles.button}>
                        <Button testID="apply-button" title="Apply" onPress={() => fetchAndToggle()}/>
                    </View>
                    <View style={styles.button}>
                        <Button testID="clear-button" title="Clear" onPress={() => clearAndToggle()}/>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 20
    },
    modalHeader: {
        marginBottom: 20,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    modalTitle: {
        fontSize: 26
    },
    modalOptions: {
        paddingHorizontal: 30
    },
    modalActions: {
        marginVertical: 10,
        paddingHorizontal: 30,
    },
    button: {
        marginVertical: 5,
    }
});

export default FilterModal;
