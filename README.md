# README

# Overview 

This is a clone of Stack Overflow. Primarily, in this application users can ask questions and reply with answers. They can also search via question (or tag name), vote, and bookmark questions. The production version of this app is hosted on **Heroku**, and can be found with this url - Infinite Go!(https://infinite-go.herokuapp.com/)). 

## Technology Stack 
1. Database: **PostgreSQL**
2. Backend: **Ruby-on-Rails**
3. Frontend: **React**, **Redux**

## Highlight Features 

![Main Screenshot](https://github.com/helenyueyu/infinite_go/blob/master/app/assets/images/pic1.png?raw=true)


### I. Implementing Rich Text Editing 

Figuring out how to integrate the DraftJS editor was tricky, since rich text is still stored as plain text in the database (the datatype of the `body` field in my questions table is `:string`. An example of what 

<img src="https://github.com/helenyueyu/infinite_go/blob/master/app/assets/images/pic8.png?raw=true)" />

To convert the plain text stored in the database into a rich text format (when you click to edit a question), I utilized the built-in `JSON.parse` to convert the string into an object, and then `convertFromRaw` method built into the DraftJS library to convert this into an entity that DraftJS could recognize. I initialized the `EditorState` object this way, so the user can see all the results of their rich text editing.

```js
    componentDidMount() {
        if (this.props.type === "edit") {
        this.props.fetchQuestion(this.props.match.params.questionId).then(() =>
                  this.setState({
                  title: this.props.question.title,
                  editorState: EditorState.createWithContent(
                      convertFromRaw(JSON.parse(this.props.question.body))
                  ), 
                  tags: this.props.question.tags.map(tag => tag.name)
              })
          );
        }
    }
```
Similarly, when the user goes to save their question, I make sure to convert the content back into a string, with `convertToRaw` and `JSON.stringify`. 

```js
    const post = {
        user_id: this.state.user_id,
        id: this.state.id,
        title: this.state.title,
        body: JSON.stringify(convertToRaw(contentState))
    };
```
I also integrated code snippets by adding an additional library: `draft-js-code`, which allows the user to save code snippets (the default tab for these code snippets is 4 spaces). 

<img src="https://github.com/helenyueyu/infinite_go/blob/master/app/assets/images/pic7.png?raw=true)" />

### II. Implementing Polymorphic Associations 

I had to implement many different examples of **polymorphic associations** in this application.
 
1. Questions, answers and comments all can be upvoted or downvoted. 
2. Both questions and answers can both have comments. 
3. Both questions and jobs can both have tags. 
4. Both questions and jobs can both be bookmarked. 

Below is an example of my vote component: 

```js
class CreateVotable < ActiveRecord::Migration[5.2]
  def change
    create_table :votes do |t|
      t.integer :value 
      t.integer :user_id, null: false 
      t.integer :voteable_id 
      t.string :voteable_type 

      t.timestamps
    end
  end
end
```
In my **vote model**, I have the follow snippet of code: 

```js
    belongs_to :voteable, polymorphic: true 
```


In my **question model**, **answer model**, and **comment model**, I have the same block 

```js
    has_many :votes, 
        as: :voteable, 
        dependent: :destroy 
```

The same `Vote.jsx` component is used across questions, answers and comments. 

```js
class Vote extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            user_id: this.props.user_id, 
            voteable_id: this.props.voteable_id,  // the primary key (id) of either the question, answer or the comment 
            voteable_type: this.props.voteable_type // either "Question", "Answer" or "Comment" 
        }
        this.upVote = this.upVote.bind(this); 
        this.downVote = this.downVote.bind(this); 
    }
    
    ...
}
```

### III. Pagination (coupled with Search) 

<img src="https://github.com/helenyueyu/infinite_go/blob/master/app/assets/images/pic5.png?raw=true)" />

Pagination is extremely common in Stack Overflow. Going to the main page of **SO** takes you to a global search/filter questions index, where you see millions of results. Similarly, a single question can have too many answers to fit on one page (leading to multiple pages). A user can have too many posts to fit on one page in his user profile, and thus require pagination. Similarly, the tags index can have too many tags to fit comfortably on one page, and require multiple pages. 

Pagination is coupled tightly with search, as the number of results depends on the search query. As fundamentally, pagination boils down to 3 parameters: 

1. Number of total results (this depends on the search query) 
2. Page number you are currently on 
3. How many results are on a page 

These 

## Minor Features 

### I. Display Selectors 
On the questions index page, the entire length 

**Fun Fact**: While I was developing this 

### II. Sorting Tags 

<img src="https://github.com/helenyueyu/infinite_go/blob/master/app/assets/images/pic3.png?raw=true)" />

### III. Calculating "People Reached" 

```rb
    def number_of_people_reached
        question_ids = self.questions.map{|question| question.id}.to_set 
        question_view_count = self.questions.map{|question| question.view_count}.reduce(0){|a,b| a + b}

        answer_view_count = 0
        self.answers.each do |answer|
            if !question_ids.include?(answer.question_id)
                question_ids.add(answer.question_id)
                answer_view_count += 1
            end
        end

        comment_view_count = 0 
        self.comments.each do |comment|
            if comment.commentable_type == 'Question' && !question_ids.include?(comment.commentable_id)
                question_ids.add(comment.commentable_id)
                comment_view_count += 1 
            end
        end

        question_view_count + answer_view_count + comment_view_count
    end
```

### IV. Calculating Number of Times a Tag is Used in One Day and One Week 

```rb
  def weekly_question_count
      self.tagged_questions.where('questions.created_at BETWEEN ? AND ?', 1.week.ago, Time.now).size 
  end

  def daily_question_count
      self.tagged_questions.where('questions.created_at BETWEEN ? AND ?', 1.day.ago.beginning_of_day, Time.now).size 
  end
```
### V. Calculating Number of Times a Question/User Profile is Viewed

### 

## Overall Comments

For this project, I tried to keep my React components as modular as possible. For the most part, each component in this application is 150 lines or fewer, with the exception of the Question Form and the Answer Form component, because they integrate so many functions from the DraftJS library. I completely avoided inline styling for this application, and also set global variables for colors and fonts in my sass stylesheets to achieve an overall apperance consistent with the website theme: 

For example, here is a snapshot of a `colors.scss` 

```scss
$black: #1F2020;
$white: #F9F6EF;
$red: #BA0C2E;

$gray: rgb(80, 79, 79); 

$focus-red: rgb(250, 40, 82); 
$light-red: rgb(252, 161, 179); 
$tag-red: rgb(250, 189, 202); 
$tag-red-lite: rgb(252, 210, 219); 
```

I utilized the **flex box** CSS model wholeheartedly in this project. In fact the primary 

## Full Features 

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

