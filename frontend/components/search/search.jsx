import React from 'react';

class Search extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            query: ""
        }

        this.handleChange = this.handleChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    handleChange(e) {
        this.setState({
            query: e.target.value 
        })
    }

    handleSubmit() {
        this.props.fetchFilteredQuestions(this.state.query); 
    }

    render() {
        return (
           <h1>
               <form onSubmit={this.handleSubmit}>
                   <input onChange={this.handleChange} />   
                   <button type="submit">Submit</button>            
                </form>
           </h1>
       )
    }
}

export default Search; 
