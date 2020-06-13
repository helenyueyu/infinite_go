import React from 'react';
import { Link } from 'react-router-dom';
import { Editor, EditorState, RichUtils } from 'draft-js';

class QuestionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.userId,
            id: this.props.type === "new" ? "" : this.props.match.params.questionId,
            title: "",
            body: "", 
            // editorState: EditorState.createEmpty()
        }

        // this.onChange = (editorState) => this.setState({ editorState });
        // this.setEditor = editor => {
        //     this.editor = editor;
        // };
        // this.focusEditor = () => {
        //     if (this.editor) {
        //         this.editor.focus();
        //     }
        // };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // this.focusEditor();

        if (this.props.type === "edit") {
            this.props.fetchQuestion(this.props.match.params.questionId)
                .then(() => this.setState({
                    title: this.props.question.title,
                    body: this.props.question.body
                }))
        }
    }

    // _onBoldClick(e) {
    //     e.preventDefault();
    //     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    // }

    handleChange(e, field) {
        e.preventDefault();
        this.setState({
            [field]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.action(this.state)
            .then(() => this.props.history.push(`/questions/${this.state.id}`));
    }

    render() {
        if (!this.props.question && this.props.type === "edit") return null;
        return (
            <div className="question_form">
                <form onSubmit={this.handleSubmit}>
                    <div key="title" className="question_form-element">
                        <label>Title
                            <input
                                onChange={(e) => this.handleChange(e, 'title')}
                                value={this.state['title']} />
                        </label>    
                    </div>

                    <div key="body" className="question_form-element">
                        <label>Body
                            {/* <Editor editorState={this.state.editorState} onChange={this.onChange} /> */}


                            <input
                                onChange={(e) => this.handleChange(e, 'body')}
                                value={this.state['body']} />
                        </label>
                    </div>

                    <button type="submit">Submit</button>
                </form>
                <div><Link to={`/questions/${this.state.id}`}>Back</Link></div>
            </div>
        )
    }
}

export default QuestionForm; 