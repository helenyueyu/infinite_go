class Api::IgnoredTagsController < ApplicationController
    def index
        @ignored_tags = current_user.ignored_tag_names 
    end

    def create
        @ignored_tag = WatchedTag.new(watched_tag_params)
        if @ignored_tag.save 
            render :show 
        else 
            render @ignored_tag.errors.full_messages, status: 401 
        end 
    end

    def destroy
        @ignored_tag = WatchedTag.find_by(tag_id: params[:id])
        if @ignored_tag.destroy 
            render :show 
        else 
            render json: @ignored_tag.errors.full_messages 
        end 
    end

    private 
    def ignored_tag_params
        params.require(:ignored).permit(:user_id, :tag_id)
    end
end
