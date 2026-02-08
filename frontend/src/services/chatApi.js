import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const sendMessage = async (message) => {
  const res = await axios.post(`${API_BASE}/chat`, { message });
  return res.data.reply;
};
