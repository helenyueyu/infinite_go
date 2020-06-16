class Vote < ApplicationRecord
    validates :value, inclusion: {in: [1, -1]}
    validates :user_id, presence: true 

    validates :user_id, uniqueness: {scope: [:voteable_type, :voteable_id] }
        
    belongs_to :voteable, polymorphic: true 

    belongs_to :user 

    def add_reputation
        id = self.voteable_id 
        type = self.voteable_type

        if type == 'Question'
            question = Question.find(id)
            question.user.add_reputation(10)
        end

        if type == 'Answer'
            answer = Answer.find(id)
            answer.user.add_reputation(10)
        end
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
