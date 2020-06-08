import React from 'react';
import { withRouter } from 'react-router-dom'; 

class Search extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            query: "", 
            pageLimit: null, 
            pageNumber: null  
        }
        
        this.handleChange = this.handleChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    componentDidMount() {
        let url = this.props.history.location.pathname; 
        if (url.includes('tagged')) {
            this.setState({
                query: url.includes("tagged") ? '[' + url.slice(url.lastIndexOf('/') + 1) + ']' : "" 
            })
        }
    }

    componentDidUpdate(prevProps) {
        let prevUrl = prevProps.location.pathname; 
        let url = this.props.location.pathname; 

        let prevSearchQuery = prevProps.search.query; 
        let currentSearchQuery = this.props.search.query; 

        if (prevSearchQuery !== currentSearchQuery) {
            let url = this.props.history.location.pathname; 
            this.setState({
                query: url.includes("tagged") ? '[' + url.slice(url.lastIndexOf('/') + 1) + ']' : ""
            })
        } 
        if (prevUrl !== url && url === "/tags") {
            this.setState({
                query: ""
            })
            this.props.receiveQuery(this.state.query); 
        }

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
                   <input className="search-input" onChange={this.handleChange} value={this.state.query}/>   
                </form>

           </div>
       )
    }
}

export default withRouter(Search); 

