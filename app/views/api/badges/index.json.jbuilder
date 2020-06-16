json.key_format! camelize: :lower 

@badges.each do |badge|
    json.set! badge.id do 
        json.extract! badge, :id, 
                :name, 
                :medal_type, 
                :category, 
                :description,  
                :created_at, 
                :updated_at 
    end 
end


