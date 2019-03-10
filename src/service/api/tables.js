import axios from '../axios/axios';

export const getTables = (callback) => {
    axios.get("/tables").then((res) => { callback(res) })
        .catch(err => { callback(err); });
};

export const getTablesData = (callback, url) => {
    axios.get(`/${url}`).then((res) => callback(res))
        .catch((err) => callback(err))
}

export const postTables = (callback, data) => {
    axios.post('/tables', data)
        .then((res) => {
            callback(res);
        }).catch((err) => callback(err));
};

export const migrateTable = (callback, data, destinationTable) => {
    axios.post(`/${destinationTable}`, data)
        .then((res) => {
            callback(res);
        }).catch((err) => callback(err));
};

export const addRowIntoTable = (callback, data, table) => {
    axios.post(`/${table}`, data)
        .then((res) => {
            callback(res);
        }).catch((err) => callback(err));
};

export const addColIntoTable = (callback, data) => {
    axios.post(`/tables`, data)
        .then((res) => {
            callback(res);
        }).catch((err) => callback(err));
};