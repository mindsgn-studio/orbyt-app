import * as Keychain from 'react-native-keychain';

export const isNew = async( navigation: any) => {
    try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
            navigation.navigate('Home');
        } else {
            navigation.navigate('Onboarding');
        }
    } catch (error) {
        navigation.navigate('Error');
    }
};