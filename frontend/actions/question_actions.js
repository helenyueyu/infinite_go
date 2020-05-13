import * as questionAPIUtil from '../util/question_api_util'; 

export const RECEIVE_ALL_QUESTIONS = 'RECEIVE_ALL_QUESTIONS'; 
export const RECEIVE_QUESTION = 'RECEIVE_QUESTION'; 

export const fetchAllQuestions = () => dispatch => (
    questionAPIUtil.getQuestions()
        .then(questions => dispatch(receiveAllQuestions(questions)))
)

export const fetchQuestion = id => dispatch => (
    questionAPIUtil.getQuestion(id)
        .then(question => dispatch(receiveQuestion(question)))
)

export const createQuestion = question => dispatch => (
    questionAPIUtil.createQuestion(question)
        .then(question => dispatch(receiveQuestion(question)))
)

export const updateQuestion = question => dispatch => (
    questionAPIUtil.updateQuestion(question)
        .then(question => dispatch(receiveQuestion(question)))
)

const receiveAllQuestions = questions => ({
    type: RECEIVE_ALL_QUESTIONS,
    questions
}) 

const receiveQuestion = question => ({
    type: RECEIVE_QUESTION,
    question
})