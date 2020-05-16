json.key_format! camelize: :lower 

json.extract! @question, :id, :title, :body, :user, :votes, :created_at, :updated_at
