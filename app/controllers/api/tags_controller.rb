class Api::TagsController < ApplicationController
    def index 
        # debugger 
        @tags = Tag.paginate(params[:page], params[:page_limit], params[:filter])
        # debugger 
    end

    def create
        name = Tag.clean_name(tag_params[:name])
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

    def search
        @tags = Tag.search(search_params)
    end

    def add_description
        @tag = Tag.find(params[:tag][:tag_id])
        @tag.description = params[:tag][:description]
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
            render json: @tag.errors.full_messages, status: 401 
        end
    end

    private
    def search_params
        params.require(:search).permit(:query)[:query]
    end
 
    def tag_params
        params.require(:tag).permit(:name, :description, :user_id)
    end

    def update_description_params 
        params.require(:tag).permit(:tag_id, :description)
    end
end
