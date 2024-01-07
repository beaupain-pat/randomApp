import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";


type CheckBox = {
    value: string,
    onPress: () => void,
    selectedValue: string
}

export const CheckBox = ({value, onPress, selectedValue}: CheckBox) => {
    return (
        <TouchableOpacity
            key={value}
            style={styles.container}
            onPress={onPress}
            testID={`checkbox-${value}`}
        >
            {value === selectedValue
                ? <Ionicons name="checkbox" size={24} color={'#27b0ff'}/>
                : <Ionicons name='square-outline' size={24} color={'#27b0ff'}/>}
            <Text style={styles.label}>{value}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 5,
    },
    label: {
        marginLeft: 10,
    }
});