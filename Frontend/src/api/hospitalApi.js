import api from "./axios";

export const getHospitals = () => api.get("/hospitals");
export const createHospital = (data) => api.post("/hospitals", data);
