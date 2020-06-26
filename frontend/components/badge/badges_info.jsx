import React from 'react'; 

import BadgesInfoItem from './badges_info_item'; 

const BadgesInfo = () => (
    <div className="badges_index-right">
        <BadgesInfoItem medal="bronze" 
                        description="Bronze badges encourage users to try out new features on the site. They are easy to get if you try!" />

        <BadgesInfoItem medal="silver"
                        description="Silver badges are less common than bronze ones. You'll need to plan your strategy to get one of these." />

        <BadgesInfoItem medal="gold"
                        description="Gold badges recognize important contributions from members of the community. They are rarely awarded." />
    </div>
)

export default BadgesInfo; 