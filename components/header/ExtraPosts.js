import React from "react"
import {Icon} from "../UI"
import {getHostname} from "../../core/helpers/utils"


const ExtraPosts = ({posts}) => (
	posts.map((post) => (
		(post.url && (post.extra_display_section === "H" || post.extra_display_section === "HF"))
			? <a
				id={post.slug}
				className="post-link white"
				key={post.slug}
				href={post.url}
				target="_blank"
			>
				<Icon name={getHostname(post.url)} className="social-icon"/>
				{
					post.description ?
						<div dangerouslySetInnerHTML={{__html: post.description}}/>
						: post.title
				}
			</a>
			: null
	))
)

export default ExtraPosts
