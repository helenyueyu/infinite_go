User.delete_all 
Question.delete_all 
Answer.delete_all 
Comment.delete_all 
Vote.delete_all 
Taggable.delete_all 
Tag.delete_all 

users = ["ronil", "angela", 
        "mike", "andy", 
        "carlos", "lina", 
        "erik", "julia", 
        "vanessa", "walker", 
        "elliot", "joe", 
        "michelle"]

users.each do |username|
    User.create!(username: username, email: "#{username}@aa.io", password: "password")
end

ronil = User.find_by(username: 'ronil')
angela = User.find_by(username: 'angela')
michelle = User.find_by(username: 'michelle')
carlos = User.find_by(username: 'carlos')
lina = User.find_by(username: 'lina')
mike = User.find_by(username: 'mike')
walker = User.find_by(username: 'walker')

questions = [
    {
        title: "Is Julian Casablancas not the hottest man alive?", 
        body: "Why yes, he is. :)", 
        user_id: ronil.id 
    }, 
    {
        title: "The Strokes or chocolate chip cookies, can I have them both?", 
        body: "Pretty pretty please. ;)", 
        user_id: ronil.id 
    }, 
    {
        title: "Where's Gerald, Carlos?", 
        body: "She's jazzing out right here!", 
        user_id: angela.id 
    }
]

questions.each do |question| 
    Question.create!(question)
end

strokes_question = Question.find_by(title: "Is Julian Casablancas not the hottest man alive?")
chocolate_question = Question.find_by(title: "The Strokes or chocolate chip cookies, can I have them both?")
gerald_question = Question.find_by(title: "Where's Gerald, Carlos?")

answers = [
    {
        body: "Julian, you are way too obssessed with the Strokes", 
        question_id: strokes_question.id, 
        user_id: michelle.id 
    }, 
    {
        body: "Ronil! You should listen to Tame Impala more", 
        question_id: strokes_question.id, 
        user_id: angela.id 
    }, 
    {
        body: "Noooo chocolate chip cookies are the best", 
        question_id: chocolate_question.id, 
        user_id: carlos.id 
    }, 
    {
        body: "I agree!", 
        question_id: chocolate_question.id, 
        user_id: lina.id 
    }
]

answers.each do |answer| 
    Answer.create!(answer)
end

tame_answer = Answer.find_by(body: "Ronil! You should listen to Tame Impala more")
chocolate_answer = Answer.find_by(body: "Noooo chocolate chip cookies are the best") 

comments = [
    {
        body: "Julian aint go nothing on Eddie Vedder", 
        commentable_id: strokes_question.id, 
        commentable_type: :Question, 
        user_id: mike.id 
    }, 
    {
        body: "What about Ooey Gooey Wooey", 
        commentable_id: strokes_question.id, 
        commentable_type: :Question, 
        user_id: angela.id 
    }, 
    {
        body: "Chocolate chip cookies are awesome - make some for me Ronil", 
        commentable_id: chocolate_question.id, 
        commentable_type: :Question, 
        user_id: carlos.id 
    }, 
    {
        body: "Chocolate chip cookies are inferior to salad", 
        commentable_id: chocolate_question.id, 
        commentable_type: :Question, 
        user_id: lina.id 
    }, 
    {
        body: "No Tame isn't the best Angela, T.O.P. is.", 
        commentable_id: tame_answer.id, 
        commentable_type: :Answer, 
        user_id: walker.id 
    }, 
    {
        body: "No Walker, Tame is inferior to Kpop", 
        commentable_id: tame_answer.id, 
        commentable_type: :Answer, 
        user_id: michelle.id 
    }, 
    {
        body: "Nom nom nom", 
        commentable_id: chocolate_answer.id, 
        commentable_type: :Answer, 
        user_id: michelle.id
    }
]

comments.each do |comment|
    Comment.create!(comment)
end

votes = [
    {
        value: 1, 
        user_id: mike.id, 
        voteable_id: strokes_question.id, 
        voteable_type: :Question
    }, 
    {
        value: 1, 
        user_id: walker.id, 
        voteable_id: strokes_question.id, 
        voteable_type: :Question 
    }, 
    {
        value: 1, 
        user_id: ronil.id, 
        voteable_id: tame_answer.id, 
        voteable_type: :Answer 
    }
]

votes.each do |vote|
    Vote.create!(vote)
end


tags = [
    {
        name: "chocolate", 
        description: "take some of that dark, rich cacao goodness", 
        user_id: ronil.id 
    }, 
    {
        name: "julian", 
        description: "the lead singer of one of the world's most famous rockbands", 
        user_id: ronil.id 
    }, 
    {
        name: "the-strokes", 
        description: "Ronil's favorite", 
        user_id: ronil.id 
    }, 
    {
        name: "gerald", 
        description: "Carlos' plant geraldine <3", 
        user_id: angela.id 
    }
]

tags.each do |tag|
    Tag.create!(tag)
end

chocolate_tag = Tag.find_by(name: 'chocolate')
julian_tag = Tag.find_by(name: 'julian')
strokes_tag = Tag.find_by(name: 'the-strokes')
gerald_tag = Tag.find_by(name: 'gerald')

taggables = [
    {
        taggable_id: chocolate_question.id, 
        taggable_type: :Question, 
        tag_id: chocolate_tag.id 
    }, 
    {
        taggable_id: strokes_question.id, 
        taggable_type: :Question, 
        tag_id: julian_tag.id 
    }, 
    {
        taggable_id: strokes_question.id, 
        taggable_type: :Question, 
        tag_id: strokes_tag.id 
    }, 
    {
        taggable_id: gerald_question.id, 
        taggable_type: :Question, 
        tag_id: gerald_tag.id 
    }, 
    {
        taggable_id: chocolate_answer.id, 
        taggable_type: :Answer, 
        tag_id: chocolate_tag.id 
    }
]

taggables.each do |taggable|
    Taggable.create!(taggable)
end

/# 
Seeding badges 

User.all.each do |user|
    if user.questions.size >= 1 
        UserBadge.create!({user_id: user.id, badge_id: Badge.find_by(name: 'First Question').id})
    end
end

User.all.each do |user|
    if user.questions.size >= 5 
        UserBadge.create!({user_id: user.id, badge_id: Badge.find_by(name: 'Question Newbie').id})
    end 
end

User.all.each do |user|
    if user.questions.size >= 10
        UserBadge.create!({user_id: user.id, badge_id: Badge.find_by(name: 'Question Enthusiast').id})
    end 
end

User.all.each do |user| 
    if user.questions.size >= 30
        UserBadge.create!({user_id: user.id, badge_id: Badge.find_by(name: 'Knowledge Seeker').id})
    end 
end

User.all.each do |user| 
    if user.votes.size >= 1
        UserBadge.create!({user_id: user.id, badge_id: Badge.find_by(name: 'First Upvote').id})
    end 
end

User.all.each do |user|
    if user.votes.size >= 1
        UserBadge.create!({user_id: user.id, badge_id: Badge.find_by(name: 'Second Upvote').id})
    end 
end

#/