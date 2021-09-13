export const GET_DATA = "GET_DATA";
export const GET_DATA_LOADING = "GET_DATA_LOADING";
export const GET_DATA_LOADED = "GET_DATA_LOADED";


export const getData = () => ({
    type: GET_DATA
});
export const getDataLoading = (status = false) => ({
    type: GET_DATA_LOADING,
    status
});
export const getDataLoaded = (result) => ({
    type: GET_DATA_LOADED,
    result
});
