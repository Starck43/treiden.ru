import React from "react"
import {Icon} from "~/components/UI"

import {getHostname} from "../../core/helpers/utils"


const ExtraPosts = ({posts}) => (
	posts.map((post) =>
		(post.url && (post.extra_display_section === "F" || post.extra_display_section === "HF"))
			? <a
				id={post.slug}
				className="post-link white centered"
				key={post.slug}
				href={post.url}
				target="_blank"
				rel="noreferrer"
			>
				<Icon name={getHostname(post.url)} className="social-icon"/>{post.title}
			</a>
			: null
	)
)

export default ExtraPosts