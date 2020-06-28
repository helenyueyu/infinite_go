json.key_format! camelize: :lower 

@users.each do |user|
    json.set! user.id do 
        json.extract! user, :id, :username, :location, :reputation, :top_three_tags 
        json.profilePhotoUrl "https://picsum.photos/id/#{user.id}/200"
    end 
end
