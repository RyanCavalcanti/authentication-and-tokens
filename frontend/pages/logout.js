import { useRouter } from 'next/router';
import { tokenService } from '../src/services/auth/tokenService';
import { useEffect } from 'react';
import { httpClient } from '../src/infra/HttpClient/httpClient';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(async () => {
    try{
      await httpClient('/api/refresh', {
        method: 'DELETE',
      })
      tokenService.delete();
      router.push('/');
    } catch(err) {
      console.log(err.message);
    }
  }, [])
  

  return(
    <div>
      Você será redirecionado em instantes...
    </div>
  )
}
