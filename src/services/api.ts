import axios from 'axios';

// ⚠️ ATENÇÃO: Substitua o '192.168.1.100' pelo IP do seu computador na rede local
const API_URL = 'http://192.168.1.100:8080/api/recursos'; 

export const api = {
  getRecursos: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  
  postRecurso: async (dados: any) => {
    const response = await axios.post(API_URL, dados);
    return response.data;
  }
};