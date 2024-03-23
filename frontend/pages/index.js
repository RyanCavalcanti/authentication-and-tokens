import { useState } from "react"
import { useRouter } from "next/router";

export default function HomeScreen() {
  const router = useRouter();
  const [valores, setValores] = useState({
    usuario: 'ryan',
    password: '1234'
  });

  function handleChange(event) {
    const fieldValue = event.target.value;
    const fieldName = evente.target.name;
    setValores((currentValues) => {
      return{
        ...currentValues,
        [fieldName]: fieldValue,
      }
    })
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(event) => {
        event.preventDefault();

        router.push("/auth-page-ssr");
        router.push("/auth-page-static");
      }}>
        <input
          placeholder="Usuário" name="usuario"
          value={valores.usuario} onChange={handleChange}
        />
        <input
          placeholder="Senha" name="senha" type="password"
          value={valores.password} onChange={handleChange}
        />
        <div>
          <button>
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}
