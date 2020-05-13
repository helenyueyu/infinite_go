class User < ApplicationRecord
    attr_reader :password 

    validates :username, :email, :password_digest, :session_token, presence: true 
    validates :username, :email, :session_token, uniqueness: true 
    validates :password, length: { minimum: 6, allow_nil: true }

    after_initialize :ensure_session_token, :ensure_username  

    has_many :questions, 
        class_name: :Question, 
        foreign_key: :user_id, 
        dependent: :destroy 

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
