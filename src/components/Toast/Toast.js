import React, { useContext, useEffect, useRef } from 'react';
import { ToastContext } from './ToastContext';
import {
    Text,
    Animated,
    Easing,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';


const COLORS = {
    success: "#28a745",
    info: "#17a2b8",
    error: "#dc3545",
    warning: "#ffc107"
}

export const Toast = () => {
    const windowHeight = Dimensions.get('window').height;
    const { toast, hide } = useContext(ToastContext);
    const translateYRef = useRef(new Animated.Value(windowHeight + 100));
    const timeout = useRef();
    

    useEffect(() => {
        if (toast.visible) {
            Animated.timing(translateYRef.current, {
                duration: 300,
                easing: Easing.ease,
                toValue: windowHeight - 100,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(translateYRef.current, {
                duration: 450,
                easing: Easing.ease,
                toValue: windowHeight + 100,
                useNativeDriver: true,
            }).start();
        }
    }, [toast]);

    useEffect(() => {
        if (toast.visible) {
            timeout.current = setTimeout(hide, 3000);
            return () => {
                if (timeout.current) {
                    clearTimeout(timeout.current);
                }
            };
        }
    }, [hide, toast]);

    return (
        <Animated.View
            style={[
                styles.toast,
                { transform: [{ translateY: translateYRef.current }] },
                {
                    backgroundColor: COLORS[toast.type]
                }
            ]}>
            <TouchableOpacity onPress={hide} style={styles.content}>
                <Text style={styles.toastMessage}> {toast.message}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    toast: {
        width: "100%",
        paddingVertical: 10,
        position: 'absolute',
        top: 0,
        zIndex: 2,
        right: 0,
        left: 0,
        
    },
    content: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        minHeight: 32,
        width: '100%',
    },
    toastMessage: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
        letterSpacing: 0.26,
        marginHorizontal: 10,
    },
});

export default Toast;