import * as answerAPIUtil from '../util/answers_api_util'; 

export const RECEIVE_ANSWERS = 'RECEIVE_ANSWERS'; 
export const RECEIVE_ANSWER = 'RECEIVE_ANSWER'; 
export const REMOVE_ANSWER = 'REMOVE_ANSWER'; 

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

const removeAnswer = answer => {
    return ({
        type: REMOVE_ANSWER, 
        answer 
    })
}

export const fetchAnswers = questionId => dispatch => {
    return answerAPIUtil.getAnswers(questionId)
                    .then(answers => {
                        dispatch(receiveAnswers(answers))
                    }); 
}

export const fetchAnswer = answerId => dispatch => {
    return answerAPIUtil.getAnswer(answerId)
        .then(answer => {
            dispatch(receiveAnswer(answer)); 
        })
}

export const createAnswer = answer => dispatch => {
    return answerAPIUtil.createAnswer(answer)
                .then(answer => dispatch(receiveAnswer(answer))); 
}

export const updateAnswer = answer => dispatch => {
    return answerAPIUtil.updateAnswer(answer)
                .then(answer => dispatch(receiveAnswer(answer))); 
}

export const deleteAnswer = id => dispatch => {
    return answerAPIUtil.deleteAnswer(id)
                .then(answer => dispatch(removeAnswer(answer))); 
}
