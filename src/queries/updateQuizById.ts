import gql from 'graphql-tag';

export const UPDATE_QUIZ_BY_ID = gql`
    mutation UpdateQuizById($id: Int!, $quiz_input: quiz_set_input) {
        update_quiz_by_pk(pk_columns: {id: $id}, _set: $quiz_input) {
            name
            title
        }
    }`;
