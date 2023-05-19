import {$authHost} from "./index";

export const createBasket = async (unique_number, basketId, deviceId) => {
    const {data} = await $authHost.post('api/basket', {unique_number,basketId, deviceId});
    return data;
}

export const getAll = async () => {
    const {data} = await $authHost.get('api/basket');
    return data;
}

export const deleteRow = async (unique_number) => {
    const {data} = await $authHost.post('api/basket/delete', {unique_number});
    return data;
}
