import gql from 'graphql-tag';

export const GET_QUESTION = gql`
    query GetQuestionsListQuery ($userUid: String!) {
        quiz(where: {user_uid: {_eq: $userUid}}) {
            id
            name
            title
        }}`;
