import React from 'react'; 

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
    const { label } = this.props;
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {label === "Code Block" ? (
          <i className="fas fa-code"></i>
        ) : label === "OL" ? (
          <i className="fas fa-list-ol"></i>
        ) : label === "UL" ? (
          <i className="fas fa-list"></i>
        ) : label === "Blockquote" ? (
          <i className="fas fa-quote-right"></i>
        ) : label === "Bold" ? (
          <i className="fas fa-bold"></i>
        ) : label === "Italic" ? (
          <i className="fas fa-italic"></i>
        ) : label === "Underline" ? (
          <i className="fas fa-underline"></i>
        ) : label}
      </span>
    );
  }
}

export default StyleButton; 
