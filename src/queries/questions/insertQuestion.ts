import gql from 'graphql-tag';

export const INSERT_QUESTION = gql`
    mutation InsertQuestion($title: String, $quiz_id: Int) {
        insert_question_one(object: {quiz_id: $quiz_id, title: $title}) {
            quiz_id
        }
    }`;
