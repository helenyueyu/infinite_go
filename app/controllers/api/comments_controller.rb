class Api::CommentsController < ApplicationController
    def index 
        @comments = Question.find(params[:question_id]).comments
    end

    def create 
        @comment = Comment.new(comment_params)
        if @comment.save 
            render :show 
        else
            render json: @comment.errors.full_messages, status: 401 
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
