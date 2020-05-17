class Api::CommentsController < ApplicationController
    def create 
        @comment = Comment.new(comment_params)
        if @comment.save 
            render :show 
        else
            render json: @comment.errors.full_messages, status: 401 
        end
    end

    private 
    def comment_params
        params.require(:comment).permit(:body, :user_id, :commentable_id, :commentable_type)
    end
end
