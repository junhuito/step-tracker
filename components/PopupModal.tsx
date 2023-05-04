import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { View, Text, StyleSheet, Modal, SafeAreaView, ViewStyle, TouchableOpacity } from 'react-native';

interface IPopupModal {
    children?: ReactNode;
    visible: boolean;
    style?: ViewStyle;
    animationType?: "none" | "slide" | "fade";
    setIsVisible: Dispatch<SetStateAction<boolean>>;
    opacity?: number;
    fullScreen?: boolean;
    onDismiss?: Function;
}

export function PopupModal(props: IPopupModal) {
    const {
        children, 
        visible = true,
        style,
        animationType = "slide",
        setIsVisible,
        opacity = 0.5,
        fullScreen = false,
        onDismiss = () => null,
    } = props;

    const fullScreenValue = fullScreen? 1:0;

    return (
        <Modal animationType={animationType} transparent={true} visible={visible} onDismiss={()=>onDismiss()}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={()=>setIsVisible(!visible)}
                style={{flex: Math.abs(fullScreenValue-1), backgroundColor: `rgba(128,128,128,${opacity})`}}
            />
            <SafeAreaView style={[styles.modalContainer, style, { flex: fullScreenValue, overflow: 'hidden' }]}>
                {fullScreen && <TouchableOpacity onPress={()=>setIsVisible(!visible)} hitSlop={10} style={{alignSelf: 'flex-end'}}>
                    <Text style={{fontSize: 20, padding: 10}}>Close</Text>
                </TouchableOpacity>}
                <View style={{height: 20}}></View>
                {children}
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
    }
});