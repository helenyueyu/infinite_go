class Api::TagsController < ApplicationController
    def index 
        # @posts = Post.all.order(created_at: :desc).paginate(page:  params[:page], per_page: 2)

        @tags = Tag.all
        # .order(created_at: :desc).paginate(page: params[:page], per_page: 3)
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
end
