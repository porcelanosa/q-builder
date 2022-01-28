import gql from 'graphql-tag';

export const UPDATE_QUESTION_BY_ID = gql`
  mutation UpdateQuestionById(
    $pk_columns: question_pk_columns_input!
    $question_input: question_set_input
  ) {
    update_question_by_pk(pk_columns: $pk_columns, _set: $question_input) {
      id
      quiz_id
    }
  }
`;
