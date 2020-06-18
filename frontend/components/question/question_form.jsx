import React from 'react';
import { Link } from 'react-router-dom';

import { Editor, 
        EditorState, 
        RichUtils, 
        convertToRaw, 
        convertFromRaw } from 'draft-js'; 

const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    fontFamily: '"Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
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
  { label: "Bold", style: "BOLD" },
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
    this.state = {
      user_id: this.props.userId,
      id: this.props.type === "new" ? "" : this.props.match.params.questionId,
      title: "",
      editorState: EditorState.createEmpty()
    };
    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => this.setState({ editorState });

    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.onTab = e => this._onTab(e);

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

  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(
      editorState,
      command
    );
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
                    onChange={this.onChange}
                    onTab={this.onTab}
                    placeholder="Tell a story..."
                    ref="editor"
                    spellCheck={true}
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

