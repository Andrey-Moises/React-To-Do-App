import api from "./axios";

const END_POINT = '/refresh';

export const RefreshService = {

    async refresh( token ) {
        return api.get(END_POINT, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

}