json.key_format! camelize: :lower 

json.extract! @ignored_tag, :id, :tag_id, :user_id 
