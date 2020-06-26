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
            tags: [], 
            tag: "", 
            searchedTags: [], 
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

        this.handleEnter = this.handleEnter.bind(this); 
        this.deleteTag = this.deleteTag.bind(this); 
        this.addTag = this.addTag.bind(this); 
        this.handleTag = this.handleTag.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
    }

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

  handleEnter(e) {
    if (e.keyCode === 13) {
        e.preventDefault(); 
        this.setState({
            tag: "", 
            tags: this.state.tags.concat(e.target.value)
        })
    } 
  }

  handleTag(e) {
    e.preventDefault();
    const query = e.target.value; 
    this.setState({
        tag: query
    },  () => this.props.searchTags(query)
    .then(() => this.setState({
        searchedTags: this.props.tags.map(tag => tag.name).slice(0,6) 
    })))
  }

  deleteTag(e, tag) {
      e.preventDefault(); 
      const idx = this.state.tags.indexOf(tag); 
      const before = this.state.tags.slice(0, idx); 
      let after = this.state.tags.slice(idx+1); 
      this.setState({
          tags: before.concat(after)
      })
  }

  addTag(e, tag) {
    e.preventDefault(); 
    this.setState({
        tags: this.state.tags.concat(tag), 
        tag: "", 
        searchedTags: [] 
    })
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
    const rawTags = this.state.tags; 

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

    
    const { type } = this.props; 
    let highestKey; 
    let question; 

    this.props.action(post).then(() => {
        if (type === 'new') {
            highestKey = Math.max(...Object.keys(this.props.questions).map(x => parseInt(x))); 
            question = this.props.questions[highestKey]; 
            for (let i = 0; i < tags.length; i++)  {
                this.props.createTag(tags[i])
                    .then(() => {
                        taggables[i].taggable_id = question.id; 
                        this.props.createTaggable(taggables[i])
                    })
            }        
        } else {
            for (let i = 0; i < tags.length; i++)  {
                this.props.createTag(tags[i])
                    .then(() => {
                        taggables[i].taggable_id = this.state.id; 
                        this.props.createTaggable(taggables[i])
                    })
            }
        }
    }).then(() => {
        if (type === 'edit') {
            const existentTags = this.props.question.tags; 
            for (let i = 0; i < existentTags.length; i++) {
                if (!rawTags.includes(existentTags[i].name)) {
                    this.props.deleteTaggable(existentTags[i].id); 
                }
            }
        }
    }).then(() => {
        if (type === 'new') {
            this.props.fetchQuestion(question.id); 
        } else {
            this.props.fetchQuestion(this.state.id); 
        }
    }).then(() => {
        this.props.history.push(`/questions/${type === 'new' ? question.id : this.state.id}/${nameExtensionURL(post.title)}`); 
    })
    

  }

  render() {
    if (!this.props.question && this.props.type === "edit") return null;
    const { editorState } = this.state;
    const { type } = this.props; 
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
                    <div className="RichEditor-editor" onClick={this.focus}>
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
                <div className="question_form-tags">
                    {this.state.tags.map((tag, idx) => 
                        <div key={idx} className="question_form-tag-item">
                            {tag}
                            <button className="question_form-tag-delete" onClick={(e) => this.deleteTag(e, tag)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>)
                    }
                </div>
                <input
                    className="question_form-tags"
                    onChange={e => this.handleTag(e)}
                    onKeyDown={e => this.handleEnter(e)}
                    value={this.state.tag}
                />

                {this.state.tag.length > 0 ? <div className="question_form-tags-search">
                    {this.state.searchedTags.map((tag, idx) => 
                        <div key={idx} className="tag-item" onClick={(e) => this.addTag(e, tag)}>{tag}</div>)
                    }
                </div> : null}
            </div>
            <button className="question_form-submit" type="submit">
                {type === 'new' ? 'Ask' : 'Update'} Your Question
            </button>
        </form>
      </div>
    );
  }
}

export default QuestionForm; 


