class ApplicationRecord < ActiveRecord::Base
    self.abstract_class = true

    def current_user_vote(current_user)
        vote = self.votes.where('user_id = ?', current_user.id).first 
        return 0 if vote.nil? 
        vote.value 
    end
end
