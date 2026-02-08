import axios from 'axios';

const API_BASE = 'https://valentine-bot-sdq0.onrender.com';

export const sendMessage = async (message) => {
  const res = await axios.post(`${API_BASE}/api/chat`, { message });
  return res.data.reply;
};
