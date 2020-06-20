import React from 'react';
import { Link } from 'react-router-dom';

import Draft from 'draft-js'; 
import PrismDraftDecorator from 'draft-js-prism'; 
import CodeUtils from 'draft-js-code'; 

const { 
  Editor, 
  EditorState, 
  RichUtils, 
  convertToRaw, 
  convertFromRaw 
} = Draft; 

import InlineStyleControls from '../editor/inline_style_controls'; 
import BlockStyleControls, { getBlockStyle } from '../editor/block_style_controls'; 

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    const decorator = new PrismDraftDecorator();

    this.state = {
      user_id: this.props.userId,
      id: this.props.type === "new" ? "" : this.props.match.params.questionId,
      title: "",
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
      this.props.fetchQuestion(this.props.match.params.questionId).then(() =>
        this.setState({
          title: this.props.question.title,
          editorState: EditorState.createWithContent(
            convertFromRaw(JSON.parse(this.props.question.body))
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
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
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

  handleTitle(e) {
    e.preventDefault();
    this.setState({
      title: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const contentState = this.state.editorState.getCurrentContent();
    let post = {
      user_id: this.state.user_id,
      id: this.state.id,
      title: this.state.title,
      body: JSON.stringify(convertToRaw(contentState))
    };
    this.props.action(post);
    this.props.history.push(`/questions/${this.state.id}`);
  }

  render() {
    if (!this.props.question && this.props.type === "edit") return null;
    const { editorState } = this.state;
    let className = "RichEditor-editor";
    return (
      <div className="question_form">
        <form onSubmit={this.handleSubmit}>
          <div key="title" className="question_form-element">
            <label>
              Title
              <input
                className="question_form-title"
                onChange={e => this.handleTitle(e)}
                value={this.state["title"]}
              />
            </label>
          </div>

            <label>
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
            </label>
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

