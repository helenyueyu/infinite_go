# README

# Overview 

This is a clone of Stack Overflow. Primarily, in this application users can ask questions and reply with answers. They can also search via question (or tag name), vote, and bookmark questions. The production version of this app is hosted on **Heroku**, and can be found with this url - Infinite Go!(https://infinite-go.herokuapp.com/)). 

## Technology Stack 
1. Database: **PostgreSQL**
2. Backend: **Ruby-on-Rails**
3. Frontend: **React**, **Redux**

## Features 

![Main Screenshot](https://github.com/helenyueyu/infinite_go/blob/master/app/assets/images/pic1.png?raw=true)


### I. Implementing Rich Text Editing 

Figuring out how to integrate the DraftJS editor was tricky, since rich text is still stored as plain text in the database (the datatype of the `body` field in my questions table is `:string`. An example of what the plain text looks like is shown below: 

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

The total number of upvotes displayed for a particular question is calculated with the following instance method: 

```rb
   def vote_count  
        self.votes.where('value = 1').count - self.votes.where('value = -1').count
   end
```

Determining whether the current user has already upvoted or downvoted is given by the following logic: 

```rb
def current_user_vote(current_user)
    vote = self.votes.where('user_id = ?', current_user.id).first
    return 0 if vote.nil? 
    vote.value 
end
```

### III. Pagination + Search 

<img src="https://github.com/helenyueyu/infinite_go/blob/master/app/assets/images/pic5.png?raw=true)" />

Pagination is extremely common in Stack Overflow. Going to the main page of **SO** takes you to a global search/filter questions index, where you see millions of results. Similarly, a single question can have too many answers to fit on one page (leading to multiple pages). A user can have too many posts to fit on one page in his user profile, and thus require pagination. Similarly, the tags index can have too many tags to fit comfortably on one page, and require multiple pages. 

Pagination is coupled tightly with search, as the number of results depends on the search query. As fundamentally, pagination boils down to 3 parameters: 

1. Number of total results (this depends on the search query) 
2. Page number you are currently on 
3. How many results are on a page 

First thing I did was to create a custom search route. 

```rb
    get 'questions(search/:search)', to: 'questions#search', search: /.*/
```

 
This route would be taken care of my a `search` method I put on my questions controller:

```rb
    def search 
        params = ensure_search_params
        res = Question.search(*ensure_search_params)
        @questions = res[0]
        @question_count = res[1] 
    end
```

This would invoke a private method in the question model: 

```rb
    def self.search(page, page_limit, query)
        if query.length > 0 
            if query.first == '['
                query = query[1..query.length-2]
                res = Question.joins(:tags).where(tags: {name: query})
            else
                res = where('title LIKE ?', "%#{query}%")
            end

            if res.length > 0 
                return [res.offset((page-1)*page_limit).limit(page_limit).order(created_at: :desc), res.size]
            else
                return [] 
            end
        end
        [self.all.offset((page-1)*page_limit).limit(page_limit).order(created_at: :desc), self.all.size] 
    end
```

Notice that if the query comes in, in the following manner: `[some_query]`, that the function processes the input as the user search **via tag**, and joins the question and tags table together, retrieving only questions in which have at least one tag whose name matches the query. Otherwise, if the query comes in bracket-less `some_query`, the function processes the input like a normal search, and invokes the Active Record method `where('title LIKE ?', "%#{query}%")` to find all questions in the table that match what the user input into the search field. 

Whatever the result is, the output is truncated by the `page` and `page_limit` parameters, using the Active Record `.offset` and `.limit` methods. This method formally returns a tuple `[res.offset((page-1)*page_limit).limit(page_limit).order(created_at: :desc), res.size]`, a.k.a. the list of results for that specific page number and number of questions per page combo and the total number of queries returned. In the frontend, we have the following AJAX request: 

```js
export const getFilteredQuestions = (page, pageLimit, query) => {
    return $.ajax({
        method: 'GET', 
        url: `/api/questions/?page=${page}&page_limit=${pageLimit}&query=${query}`
    })
}
```
One of the trickiest things that I've actually had to implement in the project is the **pagination buttons themselves**. Since, potentially, a website could have hundreds of pagination buttons, depending on quantity of the total number of questions. If I had a thousand questions on my site, and each page hosted 10 questions, that could be 100 pagination buttons! I don't want to list all 100 buttons on my site. So a good idea would be to do something like this. If the user is in the beginning of the pagination list, we want to show something like: 

```
[1], [2], [3], [4], [5], ..., [100]
```

If the user is in one of those middle pages, we would like the pagination buttons to look something like this: 

```
[1], ..., [77], [78], [79], [80], [81], ..., [100]
```

And if the user is at one of the last pages, we would like the pagination buttons to look like this: 

```
[1], ..., [96], [97], [98], [99], [100]
```

To achieve this dynamic component, I ended implementing a function that spit out an array of numbers (where each number represents a pagination button) along with (potentially up to) two break points, which rrepresent when I need to put three elipses `...` in the pagination buttons (`breakPoint2` could potentially be null, in the case where there is only one break point. 

```js
export const generatePageNumbers = (numQuestions, perPage, pageNumber) =>  ... return [arr, breakPoint1, breakPoint2] 
```

## Minor Features 

### I. Display Selectors 
On the questions index page, the entire length of the question is not displayed, rather only a snippet of the first `X words` are (the output is also in plain-text format, not with rich-text). One thing to note is that the question snippets always end on a word, they never finish in the middle of a word. 

I wrote a function `displayShortenedPost`, which takes in the original, stringified post and a character count maximum. If the original post doesn't have any spaces at all, or the original post's length is shorter than the limit, than we return the original post. Otherwise: 

1. If the character at the limit is a space (`" "`), then we truncate at that limit. 
2. Otherwise, we iterate backwards to find the closest character that is a space, and truncate at that index. 

```js
    export const displayShortenedPost = (post, limit) => {
        if (post.length <= limit || !post.includes(" ")) return post; 
        if (post[limit] === ' ') {
            return post.slice(0, limit) + ' ...'; 
        } else {
            let i = limit; 
            while (post[i] !== ' ') {
                i--; 
            }
            return post.slice(0, i) + ' ...'; 
        }
    }
```

**Fun Fact**: While I was developing this application, I forgot to think of the edge case where the content of the post **wouldn't have any white spaces at all**, and so I did not include the condition `!post.includes(" ")`. As a result, when I one time I manually entered a question with a body of just a single word, and when I went to refresh the questions index page, what I saw was just a plain white screen, and what appeared to me the browser hanging for a long time. I checked the browser for error messages. Nothing. I checked my rails console and my webpack. Nada. Growing panicked, I ended up wiping my database and trying again. Finally, I realized this might have been due to a while loop running amok. So always make sure your while loops have proper conditions to exit out of!

### II. Sorting Tags 

I implemented sorting tags via three different parameters: 

    1. Popularity (based on the number of questions with this particular tag) 
    2. Name (alphabetically in ascending order) 
    3. By creation date (with newest first)
    
Out of the 3 ways to sort, sorting by popularity was the trickiest. I have a `taggables` join table that (currently) connects the tags table to the questions one (jobs, another model that has associated tags, hasn't been implemented yet). Here, we count the number of tags with a specific `tag_id`, getting this aggregate statistic by grouping by `taag.id`, and then getting the correct number of tags with our `.offset` and `.limit` methods. 

```rb
self.select('tags.*, COUNT(taggables.tag_id) tag_freq')
            .joins(:taggables)
            .group('tags.id')
            .order('tag_freq DESC')
            .offset((page-1)*page_limit)
            .limit(page_limit)
            .order(created_at: :desc)
```

More straightforwardly, we can grab tags alphabetically: 

```rb
self.all.offset((page-1)*page_limit).limit(page_limit).order(name: :asc)
```

Or by creation date: 

```rb
self.all.offset((page-1)*page_limit).limit(page_limit).order(created_at: :desc)
```

<img src="https://github.com/helenyueyu/infinite_go/blob/master/app/assets/images/pic3.png?raw=true)" />

### III. Calculating "People Reached" 

The way I calculated this is different than the way Stack Overflow does it, but essentially, my statistic is calculated using the following formula: 

```rb
number_of_people_reached = questions_viewed + answers_viewed + comments_viewed
```

In other words, a player's "person reached" statistic is calculated by the number of times a person has viewed their question + the number of times someone has viewed a question with their answer on it + the number of times a person has viewed a question with their comment on it (code deals with potential overlap in this questions - each unique question + view combination is only counted once). 


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

I used the **Impressionist Library** to help me calculate page views. 

Firstly, I migrated an **impressions** table. Then I added the following to my `question.rb` model: 

```rb
    is_impressionable 

    def impression_count 
        impressions.size 
    end
```

And in my `questions_controller.rb`, I add: 

```rb
    impressionist actions: [:show]
```

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

