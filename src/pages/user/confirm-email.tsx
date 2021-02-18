import React from 'react';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { verifyEmail, verifyEmailVariables } from '../../api-types/verifyEmail';
import { useMe } from '../../hooks/useMe';
import { useHistory } from 'react-router-dom';

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`

export const ConfirmEmail = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const history = useHistory();
  const onCompleted = (data: verifyEmail) => {
    const { verifyEmail: { ok }} = data;
    if (ok && userData?.me.id) {
      client.writeFragment({
        id: `User:${userData.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }`,
        data: {verified: true},
      });
      history.push('/')
    }
  }
  const [mutation] = useMutation<verifyEmail, verifyEmailVariables>(VERIFY_EMAIL_MUTATION, { onCompleted });

  React.useEffect(() => {
    const code = window.location.href.split('code=');
    mutation({variables: {input: {code: code[1]}}});
  }, []);

  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <h2 className="text-lg mb-2 font-medium">Confirming email...</h2>
      <h4 className="text-grey-700 text-sm mb-1">Please wait, don't close this page...</h4>
    </div>
  );
};
