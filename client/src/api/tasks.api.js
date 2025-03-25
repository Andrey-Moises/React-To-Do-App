import api from "./axios";
const END_POINT = '/tasks';

export const TaskService = {

    async getAllTasks( token ) {
        return api.get(END_POINT, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    async createTask( token, title, description, status ) {
        return api.post(END_POINT, {
            title,
            description,
            status
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

}