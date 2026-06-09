import axios from 'axios';

// 🌐 PADRÃO UNIVERSAL: Aponta para o localhost.
// O redirecionamento de portas do ADB cuida do resto para o celular físico.
const API_URL = 'http://localhost:8080/api/recursos';

export const api = {
  // Busca todos os recursos da Base Lunar
  getRecursos: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar recursos do Spring Boot:", error);
      throw error;
    }
  },

  // Cadastra um novo recurso (combustível, oxigênio, etc.) na API Java
  postRecurso: async (dados: any) => {
    try {
      const response = await axios.post(API_URL, dados);
      return response.data;
    } catch (error) {
      console.error("Erro ao enviar dados para o Spring Boot:", error);
      throw error;
    }
  }
};