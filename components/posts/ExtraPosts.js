import {memo} from "react"

import Post from "./Post"


const ExtraPosts = ({posts, sections}) => {
	return (
		posts?.filter(post => sections.includes(post.extra_display_section))
			.map(post => post.url
				? <a
					id={post.slug}
					className={`extra-post section-${sections[0]?.toLowerCase()} post-link white centered`}
					key={post.slug}
					href={post.url}
					target="_blank"
					rel="noreferrer"
				>
					<Post item={post}/>
				</a>
				: <div
					id={post.slug}
					key={post.slug}
					className={`extra-post section-${sections[0]?.toLowerCase()} white centered`}
				>
					<Post item={post}/>
				</div>
			)
	)
}

export default memo(ExtraPosts)
