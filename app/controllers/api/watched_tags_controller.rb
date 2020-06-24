class Api::WatchedTagsController < ApplicationController
    def index
        @watched_tags = current_user.watched_tag_names 
    end

    def create
        @watched_tag = WatchedTag.new(watched_tag_params)
        if @watched_tag.save 
            render :show 
        else 
            render @watched_tag.errors.full_messages, status: 401 
        end 
    end

    def destroy
        @watched_tag = WatchedTag.find_by(tag_id: params[:id])
        if @watched_tag.destroy 
            render :show 
        else 
            render json: @watched_tag.errors.full_messages 
        end 
    end

    private 
    def watched_tag_params
        params.require(:watched_tag).permit(:user_id, :tag_id)
    end
end
