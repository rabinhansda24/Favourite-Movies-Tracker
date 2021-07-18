import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


import theme from "../theme";

import Icon from "./Icon";

const Button = (props) => {
    const { text, onPress, leftIcon, leftIconType, rightIcon, rightIconType, containerStyle, iconSize } = props

    return(
        <TouchableOpacity
            onPress={() => onPress()}
        >
            <View style={[styles.container, containerStyle]}>
                {
                    leftIcon ? <Icon type={leftIconType} name={leftIcon} size={iconSize} color={theme.colors.white} style={{paddingRight: wp(2)}} size={16} /> : null

                }
                <Text style={[styles.btnText]}>{text}</Text>
                {
                    rightIcon ? <Icon type={rightIconType} name={rightIcon} size={iconSize} color={theme.colors.white} style={{paddingLeft: wp(2)}} size={16} /> : null
                }
            </View>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "center",
        paddingHorizontal: wp(5),
        paddingVertical: wp(3),
        backgroundColor: theme.colors.primaryColor,
        borderRadius: wp(8)
    },
    btnText: {
        fontFamily: theme.fonts.medium,
        color: theme.colors.white,
        fontSize: 18
    }
})

export default Button