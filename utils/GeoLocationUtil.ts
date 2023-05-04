import GetLocation, { Location as ILocationResponse } from 'react-native-get-location'

export interface ILocation {
    latitude: number;
    longitude: number;
}

async function getCurrentLocation():Promise<ILocation>{

    const location: ILocationResponse = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
    });

    const { latitude, longitude } = location;

    return {
        latitude,
        longitude,
    }

}

export const Location = {
    getCurrentLocation
}
