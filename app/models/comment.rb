class Comment < ApplicationRecord
    validates :body, presence: true
    
    attr_accessor :username 

    has_many :votes, 
        as: :voteable, 
        dependent: :destroy 

    belongs_to :commentable, polymorphic: true 

    belongs_to :user 

    def username 
        User.find(self.user_id).username 
    end

    def current_user_vote(current_user)
        vote = self.votes.where('user_id = ?', current_user.id).first 
        return 0 if vote.nil? 
        vote.value 
    end

    def vote_count  
        self.votes.where('value = 1').count - self.votes.where('value = -1').count
    end
end
