class User < ApplicationRecord
    attr_reader :password 

    validates :username, :email, :password_digest, :session_token, presence: true 
    validates :username, :email, :session_token, uniqueness: true 
    validates :password, length: { minimum: 6, allow_nil: true }
    validates :reputation, numericality: { greater_than: 1 } 

    after_initialize :ensure_session_token, :ensure_username  

    has_many :questions, 
        class_name: :Question, 
        foreign_key: :user_id, 
        dependent: :destroy 
    
    has_many :answers, 
        class_name: :Answer, 
        foreign_key: :user_id, 
        dependent: :destroy 

    has_many :votes, 
        class_name: :Vote, 
        foreign_key: :user_id, 
        dependent: :destroy 

    has_many :voted_questions, 
        through: :questions,  
        source: :votes, 
        dependent: :destroy 

    has_many :commented_questions, 
        through: :questions,  
        source: :comments, 
        dependent: :destroy 

    has_many :user_badges, 
        class_name: :UserBadge, 
        foreign_key: :user_id, 
        dependent: :destroy 

    has_many :badges, 
        through: :user_badges, 
        source: :badge, 
        dependent: :destroy 

    # has_many :taggables,
    #     class_name: :Taggable, 
    #     foreign_key: :

    # def to_param 
    #     username 
    # end

    def medals 
        bronze_medals = self.badges.where(medal_type: 'bronze').size 
        silver_medals = self.badges.where(medal_type: 'silver').size 
        gold_medals = self.badges.where(medal_type: 'gold').size 
        [bronze_medals, silver_medals, gold_medals]
    end

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email) 
        user && user.is_password?(password) ? user : nil 
    end 

    def password=(password)
        @password = password 
        self.password_digest = BCrypt::Password.create(password)
    end 

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        self.session_token = SecureRandom.urlsafe_base64
        self.save! 
        self.session_token 
    end

    def ensure_session_token 
        self.session_token ||= SecureRandom.urlsafe_base64
    end

    # going to shorten this to 5 digits but it might be not unique for very large userbase
    def ensure_username
        if self.username != ""
            self.username 
        else
            self.username = "user#{((self.email).hash).to_s[0,6]}"
        end
    end
end



