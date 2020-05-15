json.key_format! camelize: :lower 

json.extract! @answer, :id, :body, :user_id, :question_id, :created_at, :updated_at
