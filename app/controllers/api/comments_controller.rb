class Api::CommentsController < ApplicationController
    def index 
        @comments = Question.find(params[:question_id]).comments
        @comments.each do |comment|
            comment.current_vote = comment.current_user_vote(current_user)
        end 
    end

    def create 
        @comment = Comment.new(comment_params)
        if @comment.save 
            render :show 
        else
            render json: @comment.errors.full_messages, status: 401 
        end
    end

    def update
        @comment = Comment.find(params[:id]) 
        if @comment.update_attributes(comment_params)
            render :show 
        else
            render json: @comment.errors.full_messages, status: 422 
        end
    end

    def destroy
        @comment = Comment.find(params[:id])
        if @comment.destroy 
            render :show 
        else
            render json: @comment.errors.full_messages 
        end
    end

    private 
    def comment_params
        params.require(:comment).permit(:body, :user_id, :commentable_id, :commentable_type)
    end
end
