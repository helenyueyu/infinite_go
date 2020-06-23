json.key_format! camelize: :lower 

json.extract! @watched_tag, :id, :tag_id, :user_id 
