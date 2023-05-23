import {$authHost} from "./index";

export const updateRating = async (rate, userId, deviceId) => {
    const {data} = await $authHost.put('api/ranking', {rate, userId, deviceId});
    return data;
}

export const createRate = async (rate, userId, deviceId) => {
    const {data} = await $authHost.post('api/ranking', {rate, userId, deviceId});
    return data;
}

export const fetchRates = async () => {
    const {data} = await $authHost.get('api/ranking');
    return data;
}
