import React from 'react';

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
import { nameExtensionURL, removeSpaces } from '../../selectors/display_selectors'; 

class QuestionForm extends React.Component {
  constructor(props) {
        super(props);
        const decorator = new PrismDraftDecorator();

        this.state = {
            user_id: this.props.userId,
            id: this.props.type === "new" ? "" : this.props.match.params.questionId,
            title: "",
            tags: this.props.type === "new" ? "" : this.props.tags.join(', '), 
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

  handleTags(e) {
    e.preventDefault();
    this.setState({
        tags: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const contentState = this.state.editorState.getCurrentContent();
    const post = {
        user_id: this.state.user_id,
        id: this.state.id,
        title: this.state.title,
        body: JSON.stringify(convertToRaw(contentState))
    };
    const rawTags = this.state.tags
                        .split(',')
                        .map(tag => removeSpaces(tag))

    const tags = rawTags.map(name => ({
                name: name, 
                user_id: this.state.user_id
            }))
    const taggables = rawTags.map(name => ({
                name: name, 
                taggable_id: "", 
                taggable_type: 'Question', 
                user_id: this.state.user_id 
            }))

    this.props.action(post).then(() => {
        const highestKey = Math.max(...Object.keys(this.props.questions).map(x => parseInt(x))); 
        const question = this.props.questions[highestKey]; 
        for (let i = 0; i < tags.length; i++)  {
            this.props.createTag(tags[i])
                .then(() => {
                    taggables[i].taggable_id = question.id; 
                    this.props.createTaggable(taggables[i])
                })
        }
    }).then(() => {
        const highestKey = Math.max(...Object.keys(this.props.questions).map(x => parseInt(x))); 
        const question = this.props.questions[highestKey]; 
        this.props.history.push(`/questions/${question.id}/${nameExtensionURL(post.title)}`); 
    }).then(() => {
        const highestKey = Math.max(...Object.keys(this.props.questions).map(x => parseInt(x))); 
        const question = this.props.questions[highestKey]; 
        this.props.fetchQuestion(question.id); 
    })
    
  }

  render() {
    if (!this.props.question && this.props.type === "edit") return null;
    const { editorState } = this.state;
    let className = "RichEditor-editor";
    return (
      <div className="question_form">
        <form className="question_form-form" onSubmit={this.handleSubmit}>
            <div className="question_form-section">
                <div className="question_form-title-text">
                    Title
                </div>
                <div className="question_form-title-desc">
                    Be specific and imagine you’re asking a question to another person
                </div>
                <input
                    className="question_form-title"
                    onChange={e => this.handleTitle(e)}
                    value={this.state["title"]}
                />
            </div>

            <div>
                <div className="question_form-title-text">Body</div>
                <div className="question_form-title-desc">
                    Include all the information someone would need to answer your question                
                </div>

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
            </div>

            <div className="question_form-section">
                <div className="question_form-title-text">Tags</div>
                <div className="question_form-title-desc">
                    Add up to 5 tags to describe what your question is about                
                </div>
                <input
                    className="question_form-tags"
                    onChange={e => this.handleTags(e)}
                    value={this.state["tags"]}
                />
            </div>
            <button className="question_form-submit" type="submit">Ask Your Question</button>
        </form>
      </div>
    );
  }
}

export default QuestionForm; 


