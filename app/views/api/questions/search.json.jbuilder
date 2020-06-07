json.key_format! camelize: :lower 


@questions.each do |question|
    json.set! question.id do 
        json.extract! question, :id, 
                                :title, 
                                :body, 
                                :user, 
                                :vote_count, 
                                :created_at, 
                                :updated_at

        json.set! 'tags', {} 

        json.set! 'tags' do 
            json.array! question.tags, 
                        :id, 
                        :name, 
                        :description, 
                        :created_at
        end
    end 
end