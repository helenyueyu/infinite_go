import React from 'react'; 

class TagStats extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            showMore: false 
        }

        this.show10More = this.show10More.bind(this); 
    }
    show10More() {
        this.setState({
            showMore: true 
        })
    }
    render() {
        const { tagStats } = this.props;
        if (Object.keys(tagStats).length === 0) return null; 
 
        const { showMore } = this.state; 
        return (
            <div>
                <h1 className="right_menu-title">Related Tags</h1>
                {tagStats.slice(0, 10).map((tagStat, idx) => 
                    <div key={idx} className="tag_stats">
                        <div className="tag_stats-item">
                            {tagStat.name}
                        </div>
                        <div className="tag_stats-freq">
                            x {tagStat.frequency}
                        </div>
                    </div>
                )}
                {showMore ? null : 
                    <button className="tag_stats-more"
                        onClick={this.show10More}>
                        more related tags 
                    </button>}
                {showMore ? tagStats.slice(10).map((tagStat, idx) => 
                    <div key={idx} className="tag_stats">
                        <div className="tag_stats-item">
                            {tagStat.name}
                        </div>
                        <div className="tag_stats-freq">
                            x {tagStat.frequency}
                        </div>
                    </div>
                ) : null}
            </div>
        )
    }
}

export default TagStats; 
