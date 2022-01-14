import gql from 'graphql-tag';

export const DELETE_QUIZ_BY_ID = gql`
    mutation DeleteQuizById($id: Int!) {
        delete_quiz_by_pk(id: $id) {
            id
        }
    }`;
