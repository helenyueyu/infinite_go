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

// import { Editor, 
//         EditorState, 
//         RichUtils, 
//         convertToRaw, 
//         convertFromRaw } from 'draft-js'; 

import StyleButton from '../editor/style_button'; 

const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    fontFamily: '"Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

const FIRST_CODE =
  'var message = "Hello World"\n    + "with four spaces indentation"\n\nconsole.log(message);';
const SECOND_CODE =
  'var message = "Hello World"\n  + "with 2 spaces indentation"\n\nconsole.log(message);';



function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" }
];

const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const INLINE_STYLES = [
  { label: "Bold",  style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" }
];

const InlineStyleControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    const decorator = new PrismDraftDecorator();
    const contentState = convertFromRaw({
      entityMap: {},
      blocks: [
        {
          type: "header-one",
          text: "Demo for draft-js-code"
        },
        {
          type: "unstyled",
          text: "4 spaces indentation"
        },
        {
          type: "code-block",
          text: FIRST_CODE
        },
        {
          type: "unstyled",
          text: "2 spaces indentation"
        },
        {
          type: "code-block",
          text: SECOND_CODE
        }
      ]
    });

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
    if (command) {
      return command;
    }

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

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return;
    }

    this.onChange(CodeUtils.onTab(e, editorState));
  }

  _onReturn(e) {
    const { editorState } = this.state;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return;
    }

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
      user_id: this.props.userId,
      id: this.props.type === "new" ? "" : this.props.match.params.questionId,
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
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== "unstyled"
      ) {
        className += " RichEditor-hidePlaceholder";
      }
    }
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

          <div key="unique_editor" className="question_form-element">
            <label>
              Body
              <div className="RichEditor-root">
                <BlockStyleControls
                  editorState={editorState}
                  onToggle={this.toggleBlockType}
                />

                <InlineStyleControls
                  editorState={editorState}
                  onToggle={this.toggleInlineStyle}
                />

                <div className={className} onClick={this.focus}>
                  <Editor
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    keyBindingFn={this.keyBindingFn}
                    onChange={this.onChange}
                    placeholder="Write a question..."
                    ref="editor"
                    spellCheck={true}
                    handleReturn={this.onReturn}
                    onTab={this.onTab}
                  />
                </div>
              </div>
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

