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

    def vote_count  
        self.votes.where('value = 1').count - self.votes.where('value = -1').count
    end
end
