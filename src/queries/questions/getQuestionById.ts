import gql from 'graphql-tag';

export const GET_QUESTION_BY_ID = gql`
    query GetQuestionByIdQuery ($quizId: Int!) {
        quiz_by_pk(id: $quizId) {
            id
            name
            title
        }}`;
