json.key_format! camelize: :lower 

json.extract! @tag, :id, 
                    :name, 
                    :description, 
                    :user_id, 
                    :created_at, 
                    :updated_at
