import axios from "axios";

const { API_URL } = process.env;

const options = {
  headers: { "Content-Type": "application/json", Accept: "application/json" },
};

function returnHeader(jwt) {
  const authHeader = {
    headers: { Authorization: `Bearer ${jwt}` },
  };

  return authHeader;
}

export const getAbout = () => {
  return axios.get(`${API_URL}/about`).then((res) => res.data);
};

export const login = (credentials) => {
  return axios
    .post(`${API_URL}/auth/local`, credentials, options)
    .then((res) => res.data)
    .catch((err) => err.request.status);
};

export const getPortfolio = (jwt) => {
  return axios
    .get(`${API_URL}/portfolios`, returnHeader(jwt))
    .then((res) => res.data)
    .catch((err) => err.request.status);
};

export const createPortfolio = (data, jwt) => {
  return axios
    .post(`${API_URL}/portfolios`, data, returnHeader(jwt))
    .then((res) => res.data)
    .catch((err) => err.request.status);
};

export const deletePortfolio = (id, jwt) => {
  return axios
    .delete(`${API_URL}/portfolios/${id}`, returnHeader(jwt))
    .then((res) => res.data)
    .catch((err) => err.request.status);
};

export const updatePortfolio = (data, jwt) => {
  return axios
    .put(`${API_URL}/portfolios/${data.id}`, data, returnHeader(jwt))
    .then((res) => res.data)
    .catch((err) => err.request.status);
};
