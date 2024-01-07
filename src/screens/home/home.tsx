import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {useEffect} from "react";
import {fetchActivity} from "../../redux/slice/activitySlice";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {ActivityCard} from "../../components/activityCard/activityCard";
import FilterModal from "../../components/filterModal/filterModal";


export const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: RootState) => state.activity.data);
    const isLoading = useSelector((state: RootState) => state.activity.isLoading);
    const error = useSelector((state: RootState) => state.activity.isError);
    const modalVisible = useSelector((state: RootState) => state.app.modalVisible);

    useEffect(() => {
        dispatch(fetchActivity());
    }, [])

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator testID="loader" color={'white'}/>
            </View>
        )
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>Oops, something went wrong...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ActivityCard data={data} reFetchActivity={true} />
            <FilterModal modalVisible={modalVisible} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#27b0ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#ffda27',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});
