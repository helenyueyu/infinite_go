import * as answerAPIUtil from '../util/answers_api_util'; 

export const RECEIVE_ANSWERS = 'RECEIVE_ANSWERS'; 
export const RECEIVE_ANSWER = 'RECEIVE_ANSWER'; 

const receiveAnswers = answers => {
    return ({
        type: RECEIVE_ANSWERS, 
        answers 
    })
}
const receiveAnswer = answer => {
    return ({
        type: RECEIVE_ANSWER, 
        answer 
    })
}

export const fetchAnswers = questionId => dispatch => {
    return answerAPIUtil.getAnswers(questionId)
                    .then(answers => {
                        dispatch(receiveAnswers(answers))
                    }); 
}

export const createAnswer = answer => dispatch => {
    return answerAPIUtil.createAnswer(answer)
                .then(answer => dispatch(receiveAnswer(answer))); 
}
