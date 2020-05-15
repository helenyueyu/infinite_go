json.key_format! camelize: :lower 

@answers.each do |answer|
    json.set! answer.id do 
        json.extract! answer, :id, 
                                :body, 
                                :user_id, 
                                :question_id, 
                                :user, 
                                :created_at, 
                                :updated_at
    end 
end