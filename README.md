# README

# Overview 

This is a clone of Stack Overflow. Primarily, in this application users can ask questions and reply with answers. They can also search via question (or tag name), vote, and bookmark questions. The production version of this app is hosted on **Heroku**, and can be found with this url ([link to Infinite Go!](https://infinite-go.herokuapp.com/)). 

## Technology Stack 
1. Database: **PostgreSQL**
2. Backend: **Ruby-on-Rails**
3. Frontend: **React**, **Redux**

## Highlight Features 

![alt text](https://github.com/helenyueyu/infinite_go/blob/master/app/assets/images/pic1.png?raw=true)


### I. Implementing Rich Text Editing 

Used


# All Features 

* post, edit and delete questions (edit and delete only their own)
* post, edit and delete answers (edit and delete only their own)
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
* sort tags either: 
    1. by popularity (number of questions with that tag)
    2. name (alphabetically in ascending order)
    3. creation date (newest first)
* custom pagination (used together with searching/filtering) implemented for questions and tags index 
* users have a custom profile 
Overall things learned so far from this project. 

