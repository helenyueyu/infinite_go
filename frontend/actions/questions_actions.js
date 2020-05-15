import * as questionAPIUtil from '../util/questions_api_util'; 

export const RECEIVE_ALL_QUESTIONS = 'RECEIVE_ALL_QUESTIONS'; 
export const RECEIVE_QUESTION = 'RECEIVE_QUESTION'; 
export const REMOVE_QUESTION = 'REMOVE_QUESTION'; 


const receiveAllQuestions = questions => ({
    type: RECEIVE_ALL_QUESTIONS,
    questions
})

const receiveQuestion = question => ({
    type: RECEIVE_QUESTION,
    question
})

const removeQuestion = question => ({
    type: REMOVE_QUESTION,
    question
})

export const fetchAllQuestions = () => dispatch => (
    questionAPIUtil.getQuestions()
        .then(questions => dispatch(receiveAllQuestions(questions)))
)

export const fetchFilteredQuestions = (pageNumber, pageLimit, query) => dispatch => {
    return questionAPIUtil.getFilteredQuestions(pageNumber, pageLimit, query)
        .then(questions => {
            dispatch(receiveAllQuestions(questions))
        })
}

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

export const deleteQuestion = id => dispatch => (
    questionAPIUtil.deleteQuestion(id)
        .then(question => dispatch(removeQuestion(question)))
)

