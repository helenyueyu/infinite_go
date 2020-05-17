json.key_format! camelize: :lower 

json.extract! @answer, 
    :id, 
    :body, 
    :user_id, 
    :question_id, 
    :user, 
    :vote_count, 
    :created_at, 
    :updated_at
