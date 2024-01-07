import {StyleSheet, Text, View} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {ActivityList} from "../../components/activityList/activityList";

export const Favorites = () => {
    const favoriteActivities = useSelector((state: RootState) => state.activity.favoriteActivities);

    if (favoriteActivities.length === 0) {
        return (
            <View style={styles.container}>
                <Text>No favorites yet!</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ActivityList data={favoriteActivities} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#27b0ff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
    },
});
