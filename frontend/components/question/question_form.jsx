import React from 'react';
import { Link } from 'react-router-dom';

import { EditorState, 
        RichUtils, 
        AtomicBlockUtils, 
        SelectionState, 
        convertToRaw, 
        convertFromRaw, 
        CompositeDecorator } from 'draft-js'; 
import Editor from "draft-js-plugins-editor";


class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user_id: this.props.userId,
        id: this.props.type === "new" ? "" : this.props.match.params.questionId,
        title: "",
        body: EditorState.createEmpty()
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.type === "edit") {
        this.props.fetchQuestion(this.props.match.params.questionId).then(() =>
            this.setState({
                title: this.props.question.title,
                body: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.question.body)))
            })
      );
    }
  }

  handleTitle(e) {
    e.preventDefault();
    this.setState({
        title: e.target.value
    });
  }

  onChange = editorState => {
    this.setState({
        body: editorState 
    });

    // const contentState = editorState.getCurrentContent();
    // console.log(this.state); 
    // console.log(JSON.stringify(convertToRaw(contentState)));
  }

  handleSubmit(e) {
    e.preventDefault();
    const contentState = this.state.body.getCurrentContent();
    let post = {
        user_id: this.props.userId,
        id: this.props.type === "new" ? "" : this.props.match.params.questionId, 
        title: this.state.title, 
        body: JSON.stringify(convertToRaw(contentState))
    }
    this.props.action(post)
    this.props.history.push(`/questions/${this.state.id}`);
    // .then(() => this.props.history.push(`/questions/${this.state.id}`))
  }

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(
        this.state.editorState,
        command
    );
    if (newState) {
        this.onChange(newState);
        return "handled";
    }
    return "not-handled";
  };

  render() {
    if (!this.props.question && this.props.type === "edit") return null;
    return (
      <div className="question_form">
        <form onSubmit={this.handleSubmit}>
          <div key="title" className="question_form-element">
            <label>
              Title
              <input
                onChange={e => this.handleTitle(e)}
                value={this.state["title"]}
              />
            </label>
          </div>

          <div key="body" className="question_form-element">
            <label>
              Body
              <Editor
                editorState={this.state.body}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
              />
              {/* <textarea
                    className="question_form-textarea"
                    onChange={e => this.handleChange(e, "body")}
                    value={this.state["body"]}
                  /> */}
            </label>
          </div>

          <button type="submit">Submit</button>
        </form>
        <div>
          <Link to={`/questions/${this.state.id}`}>Back</Link>
        </div>
      </div>
    );
  }
}

export default QuestionForm; 