import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from '@react-navigation/native';

import theme from "../theme";

import Icon from "./Icon";

const Header = (props) => {
    const { leftIcon, onLeftPressed, rightIcon, onRightIconPressed, leftIconType, rightIconType, title, goBack } = props
    const navigation = useNavigation();

    const onBackPressed = () => {
        navigation.pop()
    }

    return(
        <View style={styles.conrainer}>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between",}}>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start",}}>
                    {
                        goBack ? <TouchableOpacity
                            style={{
                                paddingRight: wp(5),
                                paddingBottom: wp(4),
                                paddingTop: wp(4)
                            }}
                            onPress={onBackPressed}
                        >
                            <Icon type={leftIconType ? leftIconType : "AntDesign"} name={leftIcon ? leftIcon : "arrowleft"} size={22} color="#FFFFFF" />
                        </TouchableOpacity>  
                        : 
                        null
                    }
                    {
                        title ? <Text style={{fontFamily: theme.fonts.medium, color: theme.colors.white, fontSize: 22}}>{title}</Text> 
                        : 
                        null
                    }
                </View>
                <View style={{flexDirection: "row", alignItems: "center",}}>
                    {
                        rightIcon ? <TouchableOpacity
                            style={{
                                paddingLeft: wp(5),
                                paddingBottom: wp(4),
                                paddingTop: wp(4)
                            }}
                            onPress={() => onRightIconPressed()}
                        >
                            <Icon type={rightIconType ? rightIconType : "AntDesign"} name={rightIcon ? rightIcon : "arrowleft"} size={18} color="#FFFFFF" />
                        </TouchableOpacity>  
                        : 
                        null
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    conrainer: {
        paddingBottom: hp(2),
        paddingTop: hp(6),
        paddingHorizontal: wp(5),
        width: "100%",
        margin: 0,
        backgroundColor: theme.colors.primaryColor
    },
})

export default Header