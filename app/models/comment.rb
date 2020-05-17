class Comment < ApplicationRecord
    validates :body, presence: true
    
    attr_accessor :username 

    def username 
        User.find(self.user_id).username 
    end

    belongs_to :commentable, polymorphic: true 

    belongs_to :user 
end
