class Api::TagsController < ApplicationController
    def index 
        @tags = Tag.question_count(1, 5)
    end

    def create 
        @tag = Tag.new(tag_params)
        if @tag.save 
            render :show 
        else
            render json: @tag.errors.full_messages, status: 401 
        end
    end

    def destroy 
        @tag = Tag.find(params[:id])
        if @tag.destroy 
            render :show 
        else
            render json: @tag.errors.full_messages 
        end
    end

    private 
    def tag_params
        params.require(:tag).permit(:name, :user_id, :taggable_id, :taggable_type)
    end
end
