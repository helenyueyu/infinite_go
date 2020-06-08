class Tag < ApplicationRecord
    validates :name, presence: true 
    validates :name, uniqueness: true   
    
    validates_length_of :name, maximum: 35

    attr_reader :question_count 
    
    has_many :taggables, 
        foreign_key: :tag_id, 
        class_name: :Taggable, 
        dependent: :destroy 

    has_many :tagged_questions, 
        through: :taggables, 
        source: :taggable, 
        source_type: :Question, 
        dependent: :destroy 

    def question_count
        self.tagged_questions.size 
    end

    def self.exists?(name)
        tag = where('name LIKE ?', "#{name}")
        tag.size == 1 
    end
end