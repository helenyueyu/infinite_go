import React from 'react'; 
import Draft from "draft-js"; 
import Immutable from 'immutable'; 
import PrismDraftDecorator from 'draft-js-prism'; 
import CodeUtils from 'draft-js-code'; 

const { 
    Editor, 
    EditorState, 
    RichUtils, 
    DefaultDraftBlockRenderMap, 
    Decorator, 
    convertFromRaw
} = Draft; 

const { Map, List } = Immutable; 

const FIRST_CODE =
  'var message = "Hello World"\n    + "with four spaces indentation"\n\nconsole.log(message);';
const SECOND_CODE =
  'var message = "Hello World"\n  + "with 2 spaces indentation"\n\nconsole.log(message);';

class PrismEditorExample extends React.Component {
    constructor(props) {
        super(props); 

        const decorator = new PrismDraftDecorator(); 
        const contentState = convertFromRaw({
            entityMap: {}, 
            blocks: [
                {
                    type: 'header-one', 
                    text: 'Demo for draft-js-code'
                }, 
                {
                    type: 'unstyled', 
                    text: '4 spaces indentation'
                }, 
                {
                    type: 'code-block', 
                    text: FIRST_CODE
                }, 
                {
                    type: 'unstyled', 
                    text: '2 spaces indentation'
                }, 
                {
                    type: 'code-block', 
                    text: SECOND_CODE 
                }
            ]
        }); 

        this.state = {
            editorState: EditorState.createWithContent(contentState, decorator)
        }; 

        this.focus = () => this.refs.editor.focus(); 
        this.onChange = editorState => this.setState({ editorState }); 

        this.handleKeyCommand = command => this._handleKeyCommand(command); 
        this.keyBindingFn = e => this._keyBindingFn(e); 
        this.toggleBlockType = type => this._toggleBlockType(type); 
        this.toggleInlineStyle = style => this._toggleInlineStyle(style); 
        this.onTab = e => this._onTab(e); 
        this.onReturn = e => this._onReturn(e); 
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
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)); 
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
    
    render() {
        const { editorState } = this.state; 

        let className = 'RichEditor-editor'; 
        const contentState = editorState.getCurrentContent(); 
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder'; 
            }
        }

        return (
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
                        placeholder="Write your answer..."
                        ref="editor"
                        spellCheck={true}
                        handleReturn={this.onReturn}
                        onTab={this.onTab}
                    />
                </div>
            </div>
        ); 
    }
}


const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)', 
        fontFamily: '"Consolas", monospace', 
        fontSize: '1rem', 
        padding: 2 
    }
}; 

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': 
            return 'RichEditor-blockquote'; 
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
        }
    }

    render() {
        let className = 'RichEditor-styleButton'; 
        if (this.props.active) {
            className += ' RichEditor-activeButton'; 
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        ); 
    }
}

const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' }, 
    { label: 'H2', style: 'header-two' }, 
    { label: 'H3', style: 'header-three' }, 
    { label: 'H4', style: 'header-four' }, 
    { label: 'H5', style: 'header-five' }, 
    { label: 'H6', style: 'header-six' }, 
    { label: 'Blockquote', style: 'blockquote' }, 
    { label: 'UL', style: 'unordered-list-item' }, 
    { label: 'OL', style: 'ordered-list-item' }, 
    { label: 'Code Block', style: 'code-block' }
]; 

const BlockStyleControls = props => {
    const { editorState } = props; 
    const selection = editorState.getSelection(); 
    const blockType = editorState.getCurrentContent() 
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
    {
        label: 'B', 
        style: 'BOLD'
    }, 
    {
        label: 'I', 
        style: 'ITALIC'
    }, 
    {
        label: 'U', 
        style: 'UNDERLINE'
    }, 
    {
        label: 'Mono', 
        style: 'CODE'
    }
]; 

const InlineStyleControls = props => {
    const currentStyle = props.editorState.getCurrentInlineStyle(); 
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
    )
}
export default PrismEditorExample; 