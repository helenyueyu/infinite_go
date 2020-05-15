class Api::AnswersController < ApplicationController
    def index 
        @answers = Question.find(params[:question_id]).answers 
    end

    def create 
        @answer = Answer.new(answer_params)
        if @answer.save 
            render :show 
        else
            render json: @answer.errors.full_messages 
        end
    end

    private 
    def answer_params 
        params.require(:answer).permit(:body, :question_id, :user_id)
    end
end
