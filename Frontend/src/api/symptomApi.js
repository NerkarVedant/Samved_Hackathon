import api from "./axios";

export const reportSymptom = (data) =>
  api.post("/symptoms/report", data);

export const getSymptomsByArea = (areaId) =>
  api.get(`/symptoms/area/${areaId}`);
