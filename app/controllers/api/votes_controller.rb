class Api::VotesController < ApplicationController
    def create 
        @vote = Vote.new(vote_params)
        if @vote.validate_vote(*destructure_vote_params) 
            if @vote.save 
                render :show 
            else
                render json: @vote.errors.full_messages, status: 401 
            end
        else
            render :show 
        end
    end

    def destroy 
    end

    private 
    def vote_params
        params.require(:vote).permit(:value, :user_id, :voteable_id, :voteable_type)
    end

    def destructure_vote_params 
        value, user_id, voteable_id, voteable_type = 
        vote_params.values_at(:value, :user_id, :voteable_id, :voteable_type)
    end
end
