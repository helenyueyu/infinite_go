class Answer < ApplicationRecord
    belongs_to :question
    belongs_to :user 

    has_many :votes, 
        as: :voteable, 
        dependent: :destroy 

    has_many :comments, 
        as: :commentable, 
        dependent: :destroy 

    def vote_count  
        self.votes.where('value = 1').count - self.votes.where('value = -1').count
    end

    
end
