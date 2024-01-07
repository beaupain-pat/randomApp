import {StyleSheet, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

type FavoriteButton = {
    isSelected: boolean,
    onPress: () => void
}

export const FavoriteButton = ({isSelected, onPress}: FavoriteButton) => {
    return (
        <TouchableOpacity testID="favorite-button" style={styles.favoriteButton} onPress={onPress}>
            {isSelected
                ? <Ionicons name={'star'} color={'gold'} size={25}/>
                : <Ionicons name={'star-outline'} size={25}/>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    favoriteButton: {
        padding: 5,
    },
});