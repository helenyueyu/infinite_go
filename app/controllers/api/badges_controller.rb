class Api::BadgesController < ApplicationController
    def index
        @badges = Badge.all 
    end

    def create 
       @badge = Badge.new(badge_params)
       if @badge.save 
            render :show 
       else
            render json: @badge.errors.full_messages, status: 401 
       end 
    end

    def destroy
        @badge = Badge.find(params[:id])
        if @badge.destroy 
            render :show 
        else
            render json: @badge.errors.full_messages 
        end
    end

    private
    def badge_params
        params.require(:badge).permit(:name, :description, :medal_type, :category)
    end
end
