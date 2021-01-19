import React from "react";
import { useForm } from "react-hook-form";
import { ApolloError, gql, useMutation } from '@apollo/client';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { Button } from "../components/button";
import { FormError } from '../components/form-error';
import { loginMutationVariables, loginMutation } from '../api-types/loginMutation';
import uberCloneLogo from "../images/logo.svg";
import { authTokenVar, isLoggedInVar } from '../apollo';
import { LOCAL_STORAGE_TOKEN } from '../constants';

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
  } = useForm<ILoginForm>({
    mode: "onChange",
  });
  const onCompleted = (data: loginMutation) => {
    const { login: { ok, token } } = data;
    if (ok && token) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
    }
  };
  const onError = (error: ApolloError) => {};
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION, {
    onCompleted,
    onError,
  });
  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({ variables: { loginInput: { email, password } } })
    }
  };
  return (
    <div className="flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Login | Uber Eats Clone</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={uberCloneLogo} className="w-52 mb-10" alt="Uber logo" />
        <h4 className="w-full font-medium text-left text-3xl mb-5">
          Welcome back
        </h4>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 w-full mb-5">
          <input
            ref={register({
              required: "Email is required",
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            name="email"
            required
            type="email"
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          {errors.email?.type === "pattern" && (
            <FormError errorMessage="Please enter a valid email" />
          )}
          <input
            ref={register({ required: "Password is required", minLength: 5 })}
            required
            name="password"
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 5 chars." />
          )}
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"Log in"}
          />
          {loginMutationResult?.login.error && <FormError errorMessage={loginMutationResult.login.error} />}
        </form>
        <div>
          New to UberClone?{" "}
          <Link to="/create-account" className="text-lime-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
