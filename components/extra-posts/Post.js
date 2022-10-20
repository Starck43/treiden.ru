import React, {memo} from "react"
import {Icon} from "../UI"

const Post = ({item}) => {
	return (
		<>
			{item?.cover
				? <img
					src={item.cover}
					alt={item?.title}
					className="post-image"
				/>
				: item.socialName ? <Icon name={item.socialName} className="social-icon"/> : null
			}
			{item.description
				? <div dangerouslySetInnerHTML={{__html: item.description}}/>
				: <div>{item.title}</div>
			}
		</>
	)
}

export default memo(Post)
