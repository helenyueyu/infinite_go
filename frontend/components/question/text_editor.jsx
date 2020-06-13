import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

class MyEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.onChange = (editorState) => this.setState({editorState});
        this.setEditor = (editor) => {
        this.editor = editor;
        };
        this.focusEditor = () => {
        if (this.editor) {
            this.editor.focus();
        }
        };
    }

    componentDidMount() {
        this.focusEditor();
    }

    _onBoldClick(e) {
        e.preventDefault(); 
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }

  render() {
    //   console.log(this.state.editorState.getCurrentContent().getPlainText('\u0001')); 
    return (
      <div style={styles.editor} onClick={this.focusEditor}>
        <button onMouseDown={this._onBoldClick.bind(this)}>Bold</button>
        <Editor
          ref={this.setEditor}
          editorState={this.state.editorState}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

const styles = {
    editor: {
        border: '1px solid gray',
        minHeight: '6em'
    }
};

export default MyEditor; 