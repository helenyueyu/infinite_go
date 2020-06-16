json.key_format! camelize: :lower 

json.extract! @badge, :id, 
                    :name, 
                    :medal_type, 
                    :category, 
                    :description,  
                    :created_at, 
                    :updated_at 