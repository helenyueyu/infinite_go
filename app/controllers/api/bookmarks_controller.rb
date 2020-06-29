class Api::BookmarksController < ApplicationController
    def index
        @bookmarks = current_user.bookmarked_questions  
    end

    def create
        @bookmark = Bookmark.new(bookmark_params)

        if @bookmark.validate_bookmark(*destructure_bookmark_params) 
            if @bookmark.save 
                render :show 
            else
                render json: @bookmark.errors.full_messages 
            end 
        else 
            render :show 
        end 
    end

    private 
    def bookmark_params
        params.require(:bookmark).permit(:user_id, :bookmarkable_id, :bookmarkable_type) 
    end

    def destructure_bookmark_params 
        user_id, bookmarkable_id, bookmarkable_type = 
            bookmark_params.values_at(:user_id, :bookmarkable_id, :bookmarkable_type)
    end
end
