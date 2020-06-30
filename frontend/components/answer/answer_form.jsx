import React from 'react';

import Draft from "draft-js";
import PrismDraftDecorator from "draft-js-prism";
import CodeUtils from "draft-js-code";

import { withRouter } from 'react-router-dom'; 

import { nameExtensionURL } from "../../selectors/display_selectors"; 

const { Editor, EditorState, ContentState, RichUtils, convertToRaw, convertFromRaw } = Draft;

import InlineStyleControls from "../editor/inline_style_controls";
import BlockStyleControls, {
  getBlockStyle
} from "../editor/block_style_controls"; 

class AnswerForm extends React.Component {
    constructor(props) {
        super(props);
        const decorator = new PrismDraftDecorator();

        this.state = {
            id: this.props.type === "new" ? "" : this.props.match.params.answerId, 
            user_id: this.props.userId,
            question_id: this.props.type === "edit" ? "" : this.props.question.id, 
            editorState: EditorState.createEmpty(decorator)
        }; 

        this.focus = () => this.refs.editor.focus();
        this.onChange = editorState => this.setState({ editorState });

        this.handleKeyCommand = command => this._handleKeyCommand(command);
        this.keyBindingFn = e => this._keyBindingFn(e);

        this.onTab = e => this._onTab(e);
        this.onReturn = e => this._onReturn(e);

        this.toggleBlockType = type => this._toggleBlockType(type);
        this.toggleInlineStyle = style => this._toggleInlineStyle(style);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.type === "edit") {
            this.props.fetchQuestion(this.props.match.params.questionId)
                .then(() => this.props.fetchAnswer(this.props.match.params.answerId))
                .then(() => this.setState({
                    question_id: this.props.question.id, 
                    editorState: EditorState.createWithContent(
                        convertFromRaw(JSON.parse(this.props.answer.body))
                    )
                })
            ); 
        }
    }
     _keyBindingFn(e) {
        const { editorState } = this.state;
        let command;

        if (CodeUtils.hasSelectionInBlock(editorState)) {
        command = CodeUtils.getKeyBinding(e);
        }
        if (command) return command;
        return Draft.getDefaultKeyBinding(e);
    }

    _toggleBlockType(blockType) {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
        RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
    }

    _onTab(e) {
        const { editorState } = this.state;
        if (!CodeUtils.hasSelectionInBlock(editorState)) return;
        this.onChange(CodeUtils.onTab(e, editorState));
    }

    _onReturn(e) {
        const { editorState } = this.state;
        if (!CodeUtils.hasSelectionInBlock(editorState)) return;
        this.onChange(CodeUtils.handleReturn(e, editorState));
        return true;
    }

    _handleKeyCommand(command) {
        const { editorState } = this.state;
        let newState;
        if (CodeUtils.hasSelectionInBlock(editorState)) {
        newState = CodeUtils.handleKeyCommand(editorState, command);
        }
        if (!newState) {
        newState = RichUtils.handleKeyCommand(editorState, command);
        }
        if (newState) {
        this.onChange(newState);
        return true;
        }
        return false; 
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.props.userId) {
            this.props.history.push('/login'); 
        } else {
            const contentState = this.state.editorState.getCurrentContent(); 
            let post = {
                user_id: this.state.user_id, 
                id: this.state.id, 
                question_id: this.state.question_id, 
                body: JSON.stringify(convertToRaw(contentState))
            }
            this.props.action(post)
                .then(() => {
                    const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
                    this.setState({ editorState });
                })
                .then(() => this.props.history.push(`/questions/${this.state.question_id}/${nameExtensionURL(this.props.question.title)}`))
                .then(() => this.props.fetchAnswers(post.question_id))
        }
    }

    render() {
        if (!this.props.answer && this.props.type === "edit") return null;
        const { editorState } = this.state;
        let className = "RichEditor-editor";

        return (
            <div className="answer_form">
                <form onSubmit={this.handleSubmit}>

                    <div className="answer_form-title">Your Answer</div>
                    <div className="RichEditor-root">
                        <div className="editor-controls">
                            <InlineStyleControls
                                editorState={editorState}
                                onToggle={this.toggleInlineStyle}
                            />
                            <BlockStyleControls
                                editorState={editorState}
                                onToggle={this.toggleBlockType}
                            />
                        </div>
                        <div className={className} onClick={this.focus}>
                            <Editor
                                blockStyleFn={getBlockStyle}
                                editorState={editorState}
                                handleKeyCommand={this.handleKeyCommand}
                                keyBindingFn={this.keyBindingFn}
                                onChange={this.onChange}
                                ref="editor"
                                spellCheck={true}
                                handleReturn={this.onReturn}
                                onTab={this.onTab}
                            />
                        </div>
                    </div>

                    <button className="focus-button shadow" type="submit">
                        Post Your Answer
                    </button>
                </form>
            </div>
        )
    }
}

export default withRouter(AnswerForm); 