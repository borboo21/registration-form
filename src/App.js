import styles from './App.module.css';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const sendData = (formData) => {
	console.log(formData);
};

const fieldsScheme = yup.object().shape({
	email: yup
		.string()
		.email(
			'Почта должна содержать @ и домен почтового ящика, пример: "name@mail.ru"!',
		)
		.required('Нужно ввести почту'),
	password1: yup
		.string()
		.required('Нужно ввести пароль!')
		.min(3, 'Пароль должен быть длинее 3 символов!'),
	password2: yup
		.string()
		.required('Нужно подтвердить пароль!')
		.oneOf([yup.ref('password1'), null], 'Пароли должны совпадать!'),
});

export const App = () => {
	const {
		register,
		handleSubmit,
		getValues,

		formState: { errors, dirtyFields, isValid },
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			email: '',
			password1: '',
			password2: '',
		},
		resolver: yupResolver(fieldsScheme),
	});
	const submitBtnRef = useRef(null);
	const emailError = errors.email?.message;
	const password1Error = errors.password1?.message;
	const password2Error = errors.password2?.message;

	const emailValue = getValues('email');
	const pass1Value = getValues('password1');
	const pass2Value = getValues('password2');
	console.log(emailValue, pass1Value, pass2Value);

	if (isValid) {
		submitBtnRef.current.focus();
	}
	return (
		<div className={styles.main}>
			<form className={styles.form} onSubmit={handleSubmit(sendData)}>
				<span className={styles.reg}>Регистрация</span>

				{emailError && (
					<div className={styles.errorsBlock}>
						<span className={styles.errorLabel}>{emailError}</span>
					</div>
				)}
				<input
					className={styles.input}
					type="login"
					name="email"
					placeholder="Почта"
					{...register('email')}
				/>
				<div className={styles.errorsBlock}>
					{password1Error && (
						<span className={styles.errorLabel}>{password1Error}</span>
					)}
					{password2Error && (
						<span className={styles.errorLabel}>{password2Error}</span>
					)}
				</div>
				<input
					className={styles.input}
					type="password"
					name="password1"
					placeholder="Пароль"
					{...register('password1')}
				/>
				<input
					className={styles.input}
					type="password"
					name="password2"
					placeholder="Повторите пароль"
					{...register('password2')}
				/>
				<button
					className={styles.btn}
					type="submit"
					disabled={!isValid}
					ref={submitBtnRef}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
