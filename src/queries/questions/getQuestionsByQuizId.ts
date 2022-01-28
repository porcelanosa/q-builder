import gql from 'graphql-tag';

export const GET_QUESTIONS_BY_QUIZ_ID = gql`
    query GetQuestionsByQuizIdQuery ($quizId: Int!) {
        quiz_by_pk(id: $quizId) {
            id
            name
            title
        }}`;
