import axios from '../axios/axios';

export const getTables = (callback) => {
    axios.get("/tables").then((res) => { callback(res) })
        .catch(err => { callback(err); });
};

export const getTablesData = (callback, url) => {
    axios.get(`/${url}`).then((res) => callback(res))
        .catch((err) => callback(err))
}