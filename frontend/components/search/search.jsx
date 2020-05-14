import React from 'react';
import { withRouter } from 'react-router-dom'; 

class Search extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            query: null, 
            pageLimit: null, 
            pageNumber: null  
        }
        
        this.handleChange = this.handleChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    handleChange(e) {
        this.setState({
            query: e.target.value 
        })
    }

    handleSubmit(e) {
        e.preventDefault(); 
        this.props.receiveQuery(this.state.query); 
    }

    render() {
        return (
           <div>
               <form onSubmit={this.handleSubmit}>
                   <input onChange={this.handleChange} />   
                   <button type="submit">Submit</button>            
                </form>


                <div>
                    Change Page Number: {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num =>
                        <button key={num} onClick={() => this.props.changePageNumber(num)}>
                            {num}
                        </button>
                    )}
                </div>

                <div>
                    Change Page Limit: {[5, 10, 15].map(num =>
                        <button key={num} onClick={() => this.props.changePageLimit(num)}>
                            {num}
                        </button>
                    )}
                </div>

           </div>
       )
    }
}

export default withRouter(Search); 

