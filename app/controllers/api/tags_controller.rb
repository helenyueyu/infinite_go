class Api::TagsController < ApplicationController
    def index 
        @tags = Tag.all
    end

    def search
        name = params[:name]
        @tags = Tag.search(name)
    end

    def create
        name = tag_params[:name]
        if Tag.exists?(name)
            @tag = Tag.find_by(name: name)
            render :show 
        else
            tag = {
                name: name, 
                description: tag_params[:description] == nil ? "default description" : tag_params[:description], 
                user_id: tag_params[:user_id]
            }
            @tag = Tag.new(tag)
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
