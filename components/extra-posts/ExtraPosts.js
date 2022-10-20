import Post from "./Post"


const ExtraPosts = ({posts, sections}) => {
	console.log(posts)
	return (
		posts && posts
		.filter(post=>sections.includes(post.extra_display_section))
		.map(post => (
			post.url
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
				: <div id={post.slug} className={`extra-post section-${sections[0]?.toLowerCase()} white centered`}>
					<Post item={post}/>
				</div>
		))
	)
}

export default ExtraPosts
