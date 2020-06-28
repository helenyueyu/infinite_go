class Answer < ApplicationRecord
    belongs_to :question
    belongs_to :user 

    has_many :votes, 
        as: :voteable, 
        dependent: :destroy 

    has_many :comments, 
        as: :commentable, 
        dependent: :destroy 

    def current_user_vote(current_user)
        vote = self.votes.where('user_id = ?', current_user.id).first 
        return 0 if vote.nil? 
        vote.value 
    end
    
    def vote_count  
        self.votes.where('value = 1').count - self.votes.where('value = -1').count
    end

    
end

