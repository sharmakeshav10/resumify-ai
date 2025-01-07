import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const CreateNewResume = (data) => {
  return axiosClient.post("user-resumes", data);
};

const getUsersResumes = (userEmail) => {
  return axiosClient.get("user-resumes?filters[userEmail][$eq]=" + userEmail);
};

const updateResumeDetails = (data, id) => {
  return axiosClient.put(`user-resumes/${id}`, data);
};

const getResumeInfoById = (id) => {
  return axiosClient.get("user-resumes/" + id + "?populate=*");
};

const deleteResumeById = (id) => {
  return axiosClient.delete("user-resumes/" + id);
};

export default {
  CreateNewResume,
  getUsersResumes,
  updateResumeDetails,
  getResumeInfoById,
  deleteResumeById,
};
