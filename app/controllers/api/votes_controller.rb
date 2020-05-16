class Api::VotesController < ApplicationController
    def create 
        @vote = Vote.new(vote_params)
        if @vote.save 
            render :show 
        else
            render json: @vote.errors.full_messages, status: 401 
        end
    end

    def destroy 
    end

    private 
    def vote_params
        params.require(:vote).permit(:value, :user_id, :voteable_id, :voteable_type)
    end
end
