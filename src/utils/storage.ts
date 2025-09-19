import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
    set: async (key: string, value: any) => {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    },
    get: async <T>(key: string): Promise<T | null> => {
        const val = await AsyncStorage.getItem(key);
        return val ? JSON.parse(val) : null;
    },
    remove: async (key: string) => {
        await AsyncStorage.removeItem(key);
    },
};
