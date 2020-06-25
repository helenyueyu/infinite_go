import React from 'react'; 
import { Link } from 'react-router-dom'; 

import { displayPost } from '../../selectors/display_selectors'; 

class TagsIndexItem extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            description: "", 
            showForm: false 
        }
        this.toggleForm = this.toggleForm.bind(this); 
        this.handleForm = this.handleForm.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    handleSubmit(e, tag_id) {
        e.preventDefault(); 
        this.props.updateTagDescription({
            tag_id: tag_id, 
            description: this.state.description 
        }).then(() => this.setState({
            showForm: false 
        }))
    }

    toggleForm() {
        this.setState({
            showForm: !this.state.showForm
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
                    <div className="tags_index-item-edit" onClick={this.toggleForm}>
                        edit
                    </div>
                </div>

                <div className="tags_index-item-description">
                    {this.state.showForm ? 
                    <form className="tags_index-item-form" onSubmit={(e) => this.handleSubmit(e, tag.id)}>
                        <input className="tags_index-item-form-input"
                            onChange={(e) => this.handleForm(e)} 
                        value={this.state.description}></input>
                    </form> : tag.description === null ? "" : displayPost(tag.description, 190)}                
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