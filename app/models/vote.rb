class Vote < ApplicationRecord
    validates :value, inclusion: {in: [1, -1]}
    validates :user_id, presence: true 

    validates :user_id, uniqueness: {scope: [:voteable_type, :voteable_id] }
        
    belongs_to :voteable, polymorphic: true 

    belongs_to :user 

    def add_reputation
        post = self.voteable_type.constantize.find(self.voteable_id)
        post.user.change_reputation(10)
    end

    def subtract_reputation
        post = self.voteable_type.constantize.find(self.voteable_id)
        post.user.change_reputation(-2)
    end

    def validate_vote(value, user_id, voteable_id, voteable_type)
        existing_vote = Vote.find_by(user_id: user_id, voteable_id: voteable_id, voteable_type: voteable_type)
        
        if existing_vote
            existing_vote.destroy!
            if existing_vote.value == value.to_i
                return false 
            else 
                return true 
            end
        end
        true 
    end

end
