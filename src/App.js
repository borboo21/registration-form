import styles from './App.module.css';
import { useState, useRef } from 'react';

const sendData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const [email, setEmail] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');
	const [loginError, setLoginError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	const submitBtnRef = useRef(null);

	const onSubmit = (event) => {
		event.preventDefault();
		sendData({ email, password1, password2 });
	};

	const onChangeMail = ({ target }) => {
		setEmail(target.value);
		const EMAIL_REGEXP =
			/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

		!EMAIL_REGEXP.test(target.value)
			? setLoginError(
					'Почта должна содержать @ и домен почтового ящика, пример: "name@mail.ru"!',
				)
			: setLoginError(null);
	};

	const onChangePass1 = ({ target }) => {
		setPassword1(target.value);
		if (target.value.length <= 3) {
			setPasswordError('Пароль должен быть длинее 3 символов');
		} else {
			setPasswordError(null);
		}
		if (target.value === password2) {
			setPasswordError(null);
		} else {
			setPasswordError('Пароли должны совпадать');
		}
	};

	const onChangePass2 = ({ target }) => {
		setPassword2(target.value);
		if (target.value === password1) {
			setPasswordError(null);
		} else {
			setPasswordError('Пароли должны совпадать');
		}
	};

	let empty = true;

	const isSucsess = () => {
		if (loginError === null && passwordError === null) {
			return submitBtnRef.current.focus();
		}
	};

	const isEmpty = () => {
		if (email === '' || password1 === '' || password2 === '') {
			return (empty = true);
		} else {
			return (empty = false);
		}
	};

	return (
		<div className={styles.main}>
			{isEmpty()}
			<form className={styles.form} onSubmit={onSubmit}>
				<span className={styles.reg}>Регистрация</span>
				{loginError && <span className={styles.errorLabel}>{loginError}</span>}
				<input
					className={styles.input}
					type="email"
					name="email"
					value={email}
					placeholder="Почта"
					onChange={onChangeMail}
				/>
				{passwordError && (
					<div className={styles.errorLabel}>{passwordError}</div>
				)}
				<input
					className={styles.input}
					type="password"
					name="password1"
					value={password1}
					placeholder="Пароль"
					onChange={onChangePass1}
				/>
				<input
					className={styles.input}
					type="password"
					name="password2"
					value={password2}
					placeholder="Повторите пароль"
					onChange={onChangePass2}
				/>
				{isSucsess()}
				<button
					className={styles.btn}
					type="submit"
					disabled={loginError !== null || passwordError !== null || empty}
					ref={submitBtnRef}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};

// const fieldsScheme = yup.object().shape({
// 	login: yup
// 		.string()
// 		.matches(
// 			/^[\w_]*$/,
// 			'Должны использоваться буквы, цифры или нижние подчеркивания',
// 		)
// 		.max(20, 'Должно быть меньше 20 символов.')
// 		.min(3, 'Должно быть больше 3 символов.'),
// });

// export const App = () => {
// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 	} = useForm({
// 		defaultValues: {
// 			login: '',
// 		},
// 		resolver: yupResolver(fieldsScheme),
// 	});

// 	const loginError = errors.login?.message;

// 	const onSubmit = (formData) => {
// 		console.log(formData);
// 	};

// 	return (
// 		<div className={styles.App}>
// 			<form onSubmit={handleSubmit(onSubmit)}>
// 				{loginError && <div className={styles.errorLabel}>{loginError}</div>}
// 				<input name="login" type="text" {...register('login')} />
// 				<button type="submit" disabled={!!loginError}>
// 					Отправить
// 				</button>
// 			</form>
// 		</div>
// 	);
// };
