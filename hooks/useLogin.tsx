import { useState } from "react";

export const useLogin = () => {
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    const onLogin = async (e: any) => {
        e.preventDefault();
        try {
        const token = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            email: e.currentTarget.elements.email.value,
            password: e.currentTarget.elements.password.value,
            })
        }).then(res => res.json());

        if (token.error) {
            return setError(token.message)
        }

        setSuccess(token.message);
        } catch (error:any) {
        setError(error.message)
        }
    }

    const onSingUp = async (e: any) => {
      e.preventDefault();
      try {
      const token = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
          "Content-Type": "application/json"
          },
          body: JSON.stringify({
          email: e.currentTarget.elements.email.value,
          password: e.currentTarget.elements.password.value,
          name: e.currentTarget.elements.name.value,
          })
      }).then(res => res.json());

      if (token.error) {
          return setError(token.message)
      }

      setSuccess(token.message);
      } catch (error:any) {
      setError(error.message)
      }
  }

    const loginWithGoogle = async () => {
        window.location.href = "https://apicards.imrodriguez.com/v1/auth/google"
    }

    return {
        error,
        success,
        onLogin,
        onSingUp,
        loginWithGoogle
    }
}
