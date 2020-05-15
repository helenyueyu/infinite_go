json.key_format! camelize: :lower 


@questions.each do |question|
    json.set! question.id do 
        json.extract! question, :id, 
                                :title, 
                                :body, 
                                :user, 
                                :created_at, 
                                :updated_at
    end 
end