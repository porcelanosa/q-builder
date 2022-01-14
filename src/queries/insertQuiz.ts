import gql from 'graphql-tag';

export const INSERT_QUIZ = gql`
    mutation InsertQuiz($name: String, $title: String, $user_uid: String) {
        insert_quiz_one(object: {name: $name, title: $title, user_uid: $user_uid}){
            id
        }
    }`;
