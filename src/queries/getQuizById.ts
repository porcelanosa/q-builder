import gql from 'graphql-tag';

export const GET_QUIZ_BY_ID = gql`
  query GetQuizByIdQuery($quizId: Int!) {
    quiz_by_pk(id: $quizId) {
      id
      name
      title
      questions {
        id
        quiz_id
        title
        sort
        answers {
          question_id
          title
          is_right
        }
      }
    }
  }
`;
