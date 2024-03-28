import { useState } from "react";
import { useRouter } from "next/router";
import { authService } from "../src/services/auth/authService";

export default function HomeScreen() {
  const router = useRouter();
  const [valores, setValores] = useState({
    usuario: 'ryan',
    password: 'safepassword'
  });

  function handleChange(event) {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    setValores((currentValues) => {
      return {
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
        authService.login({
          username: valores.usuario,
          password: valores.password,
        }).then(() => {
          router.push("/auth-page-ssr");
          // router.push("/auth-page-static");
        }).catch((erro) => {
          console.log(erro)
          alert("Usuário ou a senha estão inválidos")
        })
      }}>
        <input
          placeholder="Usuário" name="usuario"
          value={valores.usuario} onChange={handleChange}
        />
        <input
          placeholder="Senha" name="password" type="password"
          value={valores.password} onChange={handleChange}
        />
        <div>
          <button>
            Entrar
          </button>
        </div>
        <p>
          <a href="/auth-page-ssr">auth-page-ssr</a>
        </p>
        <p>
          <a href="/auth-page-static">auth-page-static</a>
        </p>
      </form>
    </div>
  );
}
