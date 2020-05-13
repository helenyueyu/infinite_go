class Api::QuestionsController < ApplicationController
    def index 
        @questions = Question.all 
    end

    def create 
        @question = Question.new(question_params) 
        if @question.save 
            render :show 
        else
            render json: @question.errors.full_messages, status: 422
        end
    end

    def show 
        @question = Question.find(params[:id])
    end

    def update 
        @question = Question.find(params[:id])
    
        if @question.update_attributes(question_params)
            render :show 
        else
            render json: @question.errors.full_messages, status: 422 
        end
    end

    def destroy
        @question = Question.find(params[:id])

        if @question.destroy 
            render :show 
        else
            render json: @question.errors.full_messages, status: 422
        end
    end

    private 
    def question_params 
        params.require(:question).permit(:user_id, :title, :body)
    end
end
