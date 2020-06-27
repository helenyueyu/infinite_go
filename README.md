# README

This is a clone of Stack Overflow. This application uses a **Ruby on Rails** backend, with a **PostgreSQL** database and a **React-Redux** frontend. 

Features implemented: 

* post, edit and delete questions (edit and delete only their own)
* post, edit and delete answers (edit and delete only their own)
    * both 
* comment on questions 
* upvote or downvote questions, answers and comments 
    * exactly one upvote or downvote allotted per user 
    * users are allowed to upvote their own post 
* add and remove tags to questions they posted 
* search either by title of the question, or via question tag 
* earn reputation with another user upvoting their question or answer 
* add "watch" or "ignore" tags, which filter the questions
    * questions with a "watch" tag are highlighted in yellow
    * questions with an "ignore" tag are faded out (opacity set to a low percentage)
* can sort tags either: 
    1. by popularity (number of questions with that tag)
    2. name (alphabetically in ascending order)
    3. creation date (newest first)
* custom pagination (used together with searching/filtering) implemented for questions and tags index 
* users have a custom profile 


![alt text](https://github.com/helenyueyu/infinite_go/blob/master/app/assets/images/pic1.png?raw=true)


Overall things learned so far from this project. 