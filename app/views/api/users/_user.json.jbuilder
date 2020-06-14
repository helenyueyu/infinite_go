json.key_format! camelize: :lower 

json.extract! user, :id, 
                    :username, 
                    :email, 
                    :reputation, 
                    :top_three_tags, 
                    :questions, 
                    :created_at, 
                    :updated_at 
