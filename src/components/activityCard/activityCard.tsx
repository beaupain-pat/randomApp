import {StyleSheet, Text, View, useWindowDimensions} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {ActivityItem, fetchActivity, setFavoriteActivity} from "../../redux/slice/activitySlice";
import {AppDispatch, RootState} from "../../redux/store";
import {FavoriteButton} from "../favoriteButton/favoriteButton";

const requiredActivityValues = ['type', 'participants'];

type ActivityCard = {
    data: ActivityItem,
    reFetchActivity: boolean
}

export const ActivityCard = ({data, reFetchActivity}: ActivityCard) => {
    const dispatch = useDispatch<AppDispatch>();
    const favoriteActivities = useSelector((state: RootState) => state.activity.favoriteActivities);
    const {key, activity} = data;
    const isFavorite = favoriteActivities?.some(activity => activity.key === key);
    const {width} = useWindowDimensions();

    const handleSetFavoriteActivity = async (data: ActivityItem) => {
        if (reFetchActivity) {
            await dispatch(setFavoriteActivity(data));
            await dispatch(fetchActivity());
            return;
        }
        return dispatch(setFavoriteActivity(data));
    }

    return (
        <View style={[styles.card, {width: width - 30}]}>
            <View style={styles.cardContent}>
                <Text style={styles.title}>{activity}</Text>
                {Object.keys(data).map((item, index) => {
                    if (requiredActivityValues.includes(item)) {
                        return (
                            <Text
                                key={index}
                                style={styles.subtitle}>{`${item}: ${data[item as keyof ActivityItem]}`}
                            </Text>
                        );
                    }
                })}
            </View>
            <View style={styles.cardAction}>
                <FavoriteButton
                    isSelected={isFavorite}
                    onPress={() => handleSetFavoriteActivity(data)}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxHeight: 200,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardContent: {
        flex: 8
    },
    cardAction: {
        flex: 2,
        alignItems: 'flex-end'
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    subtitle: {
        marginTop: 10,
        fontSize: 15
    }
});