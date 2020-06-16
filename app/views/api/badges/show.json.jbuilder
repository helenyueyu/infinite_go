json.key_format! camelize: :lower 

json.extract! @badge, :id, 
                    :name, 
                    :medal_type, 
                    :description,  
                    :created_at, 
                    :updated_at 