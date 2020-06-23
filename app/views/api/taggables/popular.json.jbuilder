json.tag_stats do 
    json.array! @popular_tags do |tag|
        json.name tag[0]
        json.frequency tag[1]
    end
end 