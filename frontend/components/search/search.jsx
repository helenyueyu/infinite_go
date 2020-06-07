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
                   <input className="search-input" onChange={this.handleChange} />   
                </form>

           </div>
       )
    }
}

export default withRouter(Search); 

