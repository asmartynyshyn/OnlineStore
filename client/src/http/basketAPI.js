import {$authHost} from "./index";

export const createBasket = async (basketId, deviceId) => {
    const {data} = await $authHost.post('api/basket', {basketId, deviceId});
    return data;
}

export const getAll = async () => {
    const {data} = await $authHost.get('api/basket');
    return data;
}
