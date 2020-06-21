class Taggable < ApplicationRecord
    belongs_to :taggable, polymorphic: true 
    
    belongs_to :tag, 
        class_name: :Tag, 
        foreign_key: :tag_id  

    def self.exists?(tag_id, taggable_id, taggable_type)
        taggable = where(tag_id: tag_id, taggable_id: taggable_id, taggable_type: taggable_type)
        taggable.size == 1 
    end

    def self.question_count(page_number, page_limit)
        Tag.group(:name)
            .offset((page_number-1)*page_limit)
            .limit(page_limit)
            .order('count_name DESC').count(:name)
    end
end
