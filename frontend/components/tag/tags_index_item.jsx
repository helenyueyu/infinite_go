import React from 'react'; 
import { Link } from 'react-router-dom'; 


class TagsIndexItem extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            description: ""
        }
        this.handleForm = this.handleForm.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    handleSubmit(e, tag_id) {
        // debugger; 
        e.preventDefault(); 
        this.props.updateTagDescription({
            tag_id: tag_id, 
            description: this.state.description 
        })
    }
    handleForm(e) {
        e.preventDefault(); 
        this.setState({
            description: e.target.value 
        })
    }

    render() {
        const { tag } = this.props; 
        return (
            <div className="tags_index-item">
                <div className="tags_index_item-name-container">
                    <div className="tags_index-item-name">
                        <Link className="tags_index-item-name-link" to={`/questions/tagged/${tag.name}`}>
                            {tag.name}
                        </Link>
                    </div>
                    <form onSubmit={(e) => this.handleSubmit(e, tag.id)}>
                        <input onChange={(e) => this.handleForm(e)} value={this.state.description}></input>
                    </form>
                </div>
                <div className="tags_index-item-description">
                    {tag.description}
                </div>
                <div className="tags_index-item-details">
                    <div>{tag.questionCount} question{tag.questionCount == 1 ? "" : "s"}</div>
                    <div>{tag.dailyQuestionCount} asked today,</div>
                    <div>{tag.weeklyQuestionCount} this week</div>
                </div>
                
            </div>
        )
    }
}

export default TagsIndexItem; 