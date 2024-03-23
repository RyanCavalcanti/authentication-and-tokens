export const authService = {
  async login({ username, password }) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password,
        })
      });

      if (!response.ok) {
        throw new Error("Usuário ou senha inválidos");
      }

      return response.json();
    } catch (error) {
      throw new Error("Erro ao efetuar login: " + error.message);
    }
  }
};

