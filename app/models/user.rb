class User < ApplicationRecord
    is_impressionable 
    attr_reader :password 
    attr_accessor :view_count 
    attr_reader :medals
    def impression_count 
        impressions.size 
    end

    def view_count
        self.impressionist_count  
    end

    

    validates :username, :email, :password_digest, :session_token, presence: true 
    validates :username, :email, :session_token, uniqueness: true 
    validates :password, length: { minimum: 6, allow_nil: true }
    validates :reputation, numericality: { greater_than: 0 } 

    after_initialize :ensure_session_token, :ensure_username  

    has_many :questions, 
        class_name: :Question, 
        foreign_key: :user_id, 
        dependent: :destroy 
    
    has_many :answers, 
        class_name: :Answer, 
        foreign_key: :user_id, 
        dependent: :destroy

    has_many :comments, 
        class_name: :Comment, 
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

    has_many :taggables,
        class_name: :Taggable, 
        foreign_key: :user_id, 
        dependent: :destroy
    
    has_many :tags, 
        through: :taggables, 
        source: :tag, 
        dependent: :destroy 

    has_many :bookmarks, 
        class_name: :Bookmark, 
        foreign_key: :user_id, 
        dependent: :destroy 

    def change_reputation(num)
        self.reputation += num 
        self.save!
    end

    def self.search(query)
        User.where('username LIKE ?', "%#{query}%")
    end

    def question_count
        self.questions.size 
    end

    def answer_count 
        self.answers.size 
    end

    def number_of_people_reached
        question_ids = self.questions.map{|question| question.id}.to_set 
        question_view_count = self.questions.map{|question| question.view_count}.reduce(0){|a,b| a + b}

        answer_view_count = 0
        self.answers.each do |answer|
            if !question_ids.include?(answer.question_id)
                question_ids.add(answer.question_id)
                answer_view_count += 1
            end
        end

        comment_view_count = 0 
        self.comments.each do |comment|
            if comment.commentable_type == 'Question' && !question_ids.include?(comment.commentable_id)
                question_ids.add(comment.commentable_id)
                comment_view_count += 1 
            end
        end

        question_view_count + answer_view_count + comment_view_count
    end
    
    def top_three_tags
        h = Hash.new(0)
        self.tags.each do |tag|
            h[tag.name] += 1
        end
        h.sort_by{|_, v| -v}[0..2].map(&:first)
    end

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



