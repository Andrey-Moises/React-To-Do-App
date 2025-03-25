import api from "./axios";

export const RegisterService = {

    async register( username, email, password, name, lastName ) {
        // return api.post('/register', {
        //     username,
        //     email,
        //     password,
        //     name,
        //     lastName
        // });

        let response = {}

        try {
            response = await api.post('/register', {
                username,
                email,
                password,
                name,
                lastName
            });
            // console.log(response);
            return response;
        } catch (error) {
            return {
                status: 'error',
                message: error.response?.data?.message || error.message
            };
        }
    }
    
}