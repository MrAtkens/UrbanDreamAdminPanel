import React from 'react';
import { Redirect } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import {useForm} from "react-hook-form";

import {
    FormFields,
    FormLabel,
    FormTitle,
    Error,
} from 'components/FormFields';
import { Wrapper, FormWrapper, LogoImage, LogoWrapper } from './Login.style';
import Input from 'components/Input';
import Button from 'components/Button';
import system from 'stores/systemStore'


// @ts-ignore
import Logo from "assets/image/logo.png";


const Login = observer(() => {

    if (system.isAuthenticated) return <Redirect to={{ pathname: '/' }} />;
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        system.isSubmitting = true
        system.authenticate(data.login, data.password).then(() => {
            system.isSubmitting = false
        });
    };

    return (
        <Wrapper>
            <FormWrapper>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormFields>
                        <LogoWrapper>
                            <LogoImage src={Logo}/>
                        </LogoWrapper>
                        <FormTitle>Вход</FormTitle>
                    </FormFields>

                    <FormFields>
                        <FormLabel>Логин</FormLabel>
                        <Input
                            type="text"
                            inputRef={register({ required: true, minLength: 3 })}
                            name="login"
                            placeholder="Логин"
                        />
                        {errors.login && <Error>Введите логин</Error>}
                    </FormFields>
                    <FormFields>
                        <FormLabel>Пароль</FormLabel>
                        <Input
                            type="password"
                            inputRef={register({ required: true})}
                            name="password"
                            placeholder="Пароль"
                        />
                        {errors.password && <Error>Пароль должен содержать минимум 8 символов и содержать минимум 1 заглавный символ и не алфавитный символ</Error>}
                    </FormFields>
                    <Button
                        type="submit"
                        disabled={system.isSubmitting}
                        overrides={{
                            BaseButton: {
                                style: ({ $theme }) => ({
                                    width: '100%',
                                    marginLeft: 'auto',
                                    borderTopLeftRadius: '3px',
                                    borderTopRightRadius: '3px',
                                    borderBottomLeftRadius: '3px',
                                    borderBottomRightRadius: '3px',
                                }),
                            },
                        }}
                    >
                        Войти
                    </Button>
                </form>
            </FormWrapper>
        </Wrapper>
    );
});


export default Login
