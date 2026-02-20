import api from "./axios";

export const createAppointment = (data) =>
  api.post("/appointments", data);

export const getMyAppointments = () =>
  api.get("/appointments/my");

export const updateAppointmentStatus = (id, status) =>
  api.put(`/appointments/${id}/status?status=${status}`);
