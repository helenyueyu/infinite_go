json.key_format! camelize: :lower 

json.array! @questions do |question|
    json.extract! question, :id, :title 
end


