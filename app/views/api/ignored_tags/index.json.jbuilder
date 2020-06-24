json.key_format! camelize: :lower 

@ignored_tags.each do |ignored_tag|
    json.set! ignored_tag.id do 
        json.extract! ignored_tag, :id, :name
    end 
end
