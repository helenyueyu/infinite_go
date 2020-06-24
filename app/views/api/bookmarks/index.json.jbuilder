json.key_format! camelize: :lower 

@bookmarks.each do |bookmark|
    json.set! bookmark.id do 
        json.extract! bookmark, :id, 
                            :title,  
                            :created_at
        json.vote_count bookmark.votes.size 
        json.view_count bookmark.view_count
        json.answer_count bookmark.answer_count 
        json.bookmark_count bookmark.bookmarks.size 
    end 
end 
