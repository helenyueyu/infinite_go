json.key_format! camelize: :lower 

json.extract! @tag, :id, 
                    :name, 
                    :description,
                    :taggables,  
                    :user_id, 
                    :created_at, 
                    :updated_at
