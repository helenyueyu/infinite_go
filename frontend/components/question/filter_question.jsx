import React from 'react'; 

class FilterQuestion extends React.Component {
    generateButton(num, action, active) {
        return (
            <button key={num}
                onClick={() => action(num)}
                className={num === active ? "filter_question filter_question-active" : "filter_question filter_question-non_active"}>
                {num}
            </button> 
        )
    }
    render() {
        const { type, values, bp1, bp2, action, active } = this.props; 
        // console.log(this.props); 
        return (
            <div className="filter_question-list">
                {values.map((num, idx) =>
                num === bp1 || num === bp2 ? 
                    <div className="filter_question-list-item" key={idx}>
                        {this.generateButton(num, action, active)}
                        <span className="filter_question-dots">...</span>
                    </div>
                    : 
                    <div key={idx}>
                        {this.generateButton(num, action, active)}
                    </div>
            )} {type}
            </div>
        )
    }
}

export default FilterQuestion; 
