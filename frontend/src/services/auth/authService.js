import { httpClient } from "../../infra/HttpClient/httpClient";

export const authService = {
  async login({ username, password }) {
    try {
      const response = await httpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
        method: 'POST',
        body: { username, password }
      });

      if (!response.ok) {
        throw new Error("Usuário ou senha inválidos");
      }

      return response.body;
    } catch (error) {
      throw new Error("Erro ao efetuar login: " + error.message);
    }
  }
};

