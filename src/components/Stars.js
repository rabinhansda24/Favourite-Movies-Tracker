import React, { useState, useEffect } from "react";
import { View,  } from "react-native";

import theme from "../theme";

import Icon from "./Icon";

const Stars = (props) => {
    const { rating } = props
    const [stars, setStars] = useState([])

    useEffect(() => {
        let strs = []
        for(var i = 1; i <= 10; i++) {
            if(i <= parseInt(rating)) {
                strs.push(<Icon key={i} type="Entypo" name="star" size={15} color={theme.colors.primaryColor} style={{paddingHorizontal: 4}}/>)
            } else {
                strs.push(<Icon type="Entypo" name="star" size={15} />)
            }
        }
        setStars(strs)
    }, [])

    return(
        <View style={{flexDirection: "row"}}>
            {stars}
        </View>
    )
}

export default Stars

