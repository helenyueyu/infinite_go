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
        {label === "Bold" ? (
          <i class="fas fa-bold"></i>
        ) : label === "Italic" ? (
          <i class="fas fa-italic"></i>
        ) : label === "Underline" ? (
          <i class="fas fa-underline"></i>
        ) : (
          <i class="fas fa-code"></i>
        )}
      </span>
    );
  }
}

export default StyleButton; 
