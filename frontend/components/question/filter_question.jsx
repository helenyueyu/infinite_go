import React from 'react'; 

class FilterQuestion extends React.Component {
    generateButton(num, action, active) {
        num = num.toString(); 
        return (
            <button key={num}
                onClick={() => action(num)}
                className={parseInt(num) === parseInt(active) ? "filter_question filter_question-active" : "filter_question filter_question-non_active"}
                disabled={num === active ? true : false}>
                {num}
            </button> 
        )
    }
    render() {
        const { values, bp1, bp2, action, active } = this.props; 
        if (!Number.isInteger(values[values.length-1])) return null; 
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
            )} 
                <span className="filter_question-type">{type}</span>
            </div>
        )
    }
}

export default FilterQuestion; 
