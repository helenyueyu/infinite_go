import React from 'react'; 

import { Link } from 'react-router-dom'; 

class Author extends React.Component {
    render() {
        return (
            <div className="info_index">
                <h1 className="info_index-title">About Me</h1>

                <div className="info_index-div">
                    Hello! Nice to meet you. I'm Helen. 
                </div>

                <div className="info_index-div">
                    I'm a software developer that loves to code and build things. As evidenced by this project you've stumbled upon. I also am huge board game lover, enjoy playing the piano and guitar and (when I'm in the mood for it) love to explore new places in SF. 
                </div>
                
                <div className="info_index-div">
                    Actually, Infinite Go was a project started almost a year ago. I began it with the intention of making a pixel perfect clone of Stack Overflow. However, I didn't get very far. As a perfectionist, I obsessed over geting my clone to look like the pixel perfect representation of SO, prioritizing the visuals ver the functionality. I unfortunately didn't complete a lot of features I planned to get done right, features that included: 
                </div>

                <ul className="info_index-list">
                    <li>search</li>
                    <li>answers</li>
                    <li>comments</li>
                    <li>votes</li>
                    <li>tags</li>
                    <li>user profiles</li>
                    <li>jobs</li>
                    <li>reputation</li>
                    <li>badges</li>
                </ul>

                <div className="info_index-div">
                    When I revisited my old code nearly 9 months later, it was a complete mess. React components were extremely bloated (yep, I had one component that was over 600 lines long), there was a mixture of inline styling and external styling (with little consistency with naming), and overall just very un-dry code. The code was so convoluted, that I actually struggled to understand it, and was reluctant to refactor it, lest I accidentally break it.
                </div>
                
                <div className="info_index-div">
                    So I decided to start over. In the beginning, I decided to primarily focus on functionality over CSS (the opposite of my old way of thinking), and quickly built out an ugly, but functional skeleton, to which I slowly beautified CSS-wise overtime. And now, I find working on this project to be incredibly rewarding. I'm constantly learning new things, and it's an enjoyable challenge to implement new features. 
                </div>

                <div className="info_index-div">
                    Phew. Have fun exploring this site! If you find any bugs, feel free to reach out to me at one of the following avenues: 
                </div>

                <ul className="info_index-list">
                    <li>Email: helenyueyu@gmail.com</li>
                    <li>
                        <Link to="https://www.linkedin.com/in/helen-yu-08b57953/">
                            LinkedIn
                        </Link>   
                    </li>            
                 </ul>
            </div>
        )
    }
}

export default Author; 