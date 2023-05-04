import AsyncStorage from '@react-native-async-storage/async-storage';

async function setItem(key: string, value: any): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
}

async function getItem(key: string, defaultValue?: any): Promise<any> {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
        return JSON.parse(value);
    }
    return defaultValue;
}

export const StorageService = {
    setItem,
    getItem
};