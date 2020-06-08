class Api::TagsController < ApplicationController
    def index 
        @tags = Tag.all
    end

    def create
        name = tag_params[:name]
        if Tag.exists?(name)
            @tag = Tag.find_by(name: name)
            render :show 
        else
            @tag = Tag.new(tag_params)
            if @tag.save 
                render :show 
            else
                render json: @tag.errors.full_messages, status: 401 
            end
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
        params.require(:tag).permit(:name, :description, :user_id)
    end
end
