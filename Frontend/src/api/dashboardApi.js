import api from "./axios";

export const getAreaRisk = (areaId) =>
  api.get(`/dashboard/area-risk/${areaId}`);
