import React, {useEffect, useState} from "react";

function Login({onLogin, onHandler}) {
console.log()
  const [loginState, setLoginState] = useState(
    {
      email: '',
      password: '',
    }
  )

  useEffect( () =>{
    onHandler('', '/signup', 'Регистрация');
  }, [])

  function handleChange(e) {
    const {name, value} = e.target;
    setLoginState(prevState => ({...prevState, [name]: value}));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(loginState)
  }

  return (
    <>
        <div className='login'>
          <form action="#"
                onSubmit={handleSubmit}
                className="login__form"
                name='register' noValidate>
            <h2 className='login__title'>Вход</h2>
            <input type="text"
                   value={loginState.email}
                   onChange={handleChange}
                   className="login__input login__input_type_first"
                   name="email"
                   placeholder="E-mail"
                   minLength="2"
                   maxLength="40" required/>
            <input type="password"
                   value={loginState.password}
                   onChange={handleChange}
                   className="login__input login__input_type_last"
                   name="password"
                   placeholder="Пароль"
                   minLength="2"
                   maxLength="200" required/>
            <button type="submit"
                    aria-label="submit"
                    className='login__submit'
                    name="form_submit">
              Войти
            </button>
          </form>
        </div>
    </>
  );
}

export default Login;
