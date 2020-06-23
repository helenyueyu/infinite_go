class Api::WatchedTagsController < ApplicationController
    def create
        @watched_tag = WatchedTag.new(watched_tag_params)
        if @watched_tag.save 
            render :show 
        else 
            render @watched_tag.errors.full_messages, status: 401 
        end 
    end

    private 
    def watched_tag_params
        params.require(:watched_tag).permit(:user_id, :tag_id)
    end
end
