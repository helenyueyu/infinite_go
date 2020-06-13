json.key_format! camelize: :lower 

json.extract! @answer, 
    :id, 
    :body, 
    :user_id, 
    :question_id, 
    :accepted, 
    :user, 
    :vote_count, 
    :created_at, 
    :updated_at
