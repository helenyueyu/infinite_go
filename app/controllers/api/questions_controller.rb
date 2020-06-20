class Api::QuestionsController < ApplicationController
    impressionist actions: [:show]
    
    def index 
        @questions = Question.all 
    end

    def search 
        params = ensure_search_params
        @questions = Question.search(*ensure_search_params)
        @question_count = @questions.size 
    end

    def random
        @questions = Question.get_random(15)
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
        @question.current_vote = @question.current_user_vote(current_user)
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

    def ensure_search_params
        page = params[:page].to_i 
        page_limit = params[:page_limit] ? params[:page_limit].to_i : 2 
        query = params[:query] ? params[:query] : "" 

        [page, page_limit, query]
    end
end



