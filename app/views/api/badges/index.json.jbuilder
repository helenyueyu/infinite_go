json.key_format! camelize: :lower 

json.tags @badges do |badge|
    json.extract! badge, :name, 
                    :medal_type, 
                    :description,  
                    :created_at, 
                    :updated_at 
end

