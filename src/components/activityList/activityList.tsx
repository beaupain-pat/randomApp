import {View, FlatList, StyleSheet} from "react-native";
import {ActivityCard} from "../activityCard/activityCard";
import {ActivityItem} from "../../redux/slice/activitySlice";


type ActivityList = {
    data: ActivityItem[]
}

export const ActivityList = ({data} : ActivityList) => {
    return (
        <FlatList
            data={data}
            renderItem={({item, index}) => (
                <View style={styles.listItem}>
                    <ActivityCard
                        key={index}
                        data={item}
                        reFetchActivity={false}
                    />
                </View>
            )}
        />
    )
}

const styles = StyleSheet.create({
    listItem: {
        margin: 5
    }
});