class Api::BookmarksController < ApplicationController
    def create
        @bookmark = Bookmark.new(bookmark_params)
        # debugger 
        if @bookmark.save 
            # debugger 
            render :show 
        else
            render json: @bookmark.errors.full_messages 
        end 
    end

    private 
    def bookmark_params
        params.require(:bookmark).permit(:user_id, :bookmarkable_id, :bookmarkable_type) 
    end
end
