import api from "./axios";
const END_POINT = '/login';

export const LoginService = {

    async login( user, password ) {
        return api.post(END_POINT, {
            user,
            password
        });
    }
    
}