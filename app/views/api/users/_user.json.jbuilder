json.key_format! camelize: :lower 

json.extract! user, :id, :username, :email, :reputation, :questions, :created_at, :updated_at 
