class Api::AnswersController < ApplicationController
    def index 
        @answers = Question.find(params[:question_id]).answers 
    end

    def create 
        @answer = Answer.new(answer_params)
        # debugger 
        @answer.accepted = false 
        if @answer.save 
            render :show 
        else
            render json: @answer.errors.full_messages 
        end
    end

    def show
        @answer = Answer.find(params[:id]) 
    end

    def update 
        # debugger 
        @answer = Answer.find(params[:id])
        if @answer.update_attributes(answer_params)
            render :show 
        else
            render json: @answer.errors.full_messages, status: 422 
        end
    end

    def destroy
        @answer = Answer.find(params[:id])
        if @answer.destroy 
            render :show 
        else
            render json: @answer.errors.full_messages 
        end
    end

    private 
    def answer_params 
        params.require(:answer).permit(:id, :body, :question_id, :user_id, :accepted)
    end
end
