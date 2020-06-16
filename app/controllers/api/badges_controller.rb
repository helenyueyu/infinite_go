class Api::BadgesController < ApplicationController
    def index
        @badges = Badge.all 
    end

    def create 
       @badge = User.new(badge_params)
       if @badge.save 
            render :index 
       else
            render json: @badge.errors.full_messages, status: 401 
       end 
    end

    private
    def badge_params
        params.require(:badge).permit(:name, :description, :medal_type, :category)
    end
end
