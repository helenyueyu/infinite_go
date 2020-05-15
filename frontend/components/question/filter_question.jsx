import React from 'react'; 

class FilterQuestion extends React.Component {
    render() {
        const { type, values, action } = this.props; 
        return (
            <div>
                {type}: {values.map(num =>
                <button key={num} onClick={() => action(num)}>
                    {num}
                </button>
            )}
            </div>
        )
    }
}

export default FilterQuestion; 
