import gql from 'graphql-tag';

export const GET_QUIZZES = gql`
    query GetQuizesListQuery ($userUid: String!) {
        quiz(where: {user_uid: {_eq: $userUid}}) {
            id
            name
            title
        }}`;
