import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Home} from "../../screens/home/home";
import {Favorites} from "../../screens/favorites/favorites";
import {Ionicons} from "@expo/vector-icons";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {toggleModal} from "../../redux/slice/appSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const Tab = createBottomTabNavigator();

export function BottomTabs() {
    const dispatch = useDispatch();
    const modalVisible = useSelector((state: RootState) => state.app.modalVisible);
    const favoriteActivities = useSelector((state: RootState) => state.activity.favoriteActivities);
    const selectedFilter = useSelector((state: RootState) => state.activity.selectedFilter);
    return (
        <Tab.Navigator>
            <Tab.Screen name={"Home"} component={Home} options={{
                headerRight: () => (
                    <TouchableOpacity
                        style={styles.filterButton}
                        onPress={() => dispatch(toggleModal(!modalVisible))}>
                        <Text style={styles.selectedFilter}>{selectedFilter}</Text>
                        <Ionicons name={'filter'} size={20}/>
                    </TouchableOpacity>
                ),
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="home" color={color} size={size}/>
                )
            }}/>
            <Tab.Screen name={"Favorites"} component={Favorites} options={{
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="star" color={color} size={size}/>
                ),
                tabBarBadge: favoriteActivities.length
            }}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    filterButton: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    selectedFilter: {
        marginRight: 10
    }
});