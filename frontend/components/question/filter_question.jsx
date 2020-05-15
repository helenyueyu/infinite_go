import React from 'react'; 

class FilterQuestion extends React.Component {
    render() {
        return (
            <div>
                {this.props.type}: {this.props.values.map(num =>
                <button key={num} onClick={() => this.props.action(num)}>
                    {num}
                </button>
            )}
            </div>
        )
    }
}

export default FilterQuestion; 
