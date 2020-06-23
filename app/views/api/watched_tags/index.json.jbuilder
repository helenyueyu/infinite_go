json.key_format! camelize: :lower 

@watched_tags.each do |watched_tag|
    json.set! watched_tag.id do 
        json.extract! watched_tag, :id, 
                                :name
    end 
end
