json.key_format! camelize: :lower 

json.extract! @answer, 
    :id, 
    :body, 
    :user_id, 
    :question_id, 
    :accepted, 
    :vote_count, 
    :created_at, 
    :updated_at
    
json.set! 'user' do
            json.extract! @answer.user, :id, 
                                        :created_at, 
                                        :description, 
                                        :email, 
                                        :last_seen_at, 
                                        :location, 
                                        :reputation, 
                                        :username, 
                                        :medals
                            
        end