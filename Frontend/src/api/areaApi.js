import api from "./axios";

export const getAreas = () => api.get("/areas");
export const createArea = (data) => api.post("/areas", data);
