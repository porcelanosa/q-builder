import gql from 'graphql-tag';

export const DELETE_QUESTION_BY_ID = gql`
    mutation DeleteQuestionById($id: Int!) {
        delete_quiz_by_pk(id: $id) {
            id
        }
    }`;
