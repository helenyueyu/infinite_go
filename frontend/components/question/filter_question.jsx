import React from 'react'; 

class FilterQuestion extends React.Component {
    
    render() {
        console.log("filter question", this.props); 

        const { type, values, action, active } = this.props; 
        return (
            <div>
                {values.map(num =>
                <button key={num} 
                    onClick={() => action(num)} 
                    className={num === active ? "filter_question filter_question-active" : "filter_question filter_question-non_active"}>
                        {num}
                </button>
            )} {type}
            </div>
        )
    }
}

export default FilterQuestion; 
