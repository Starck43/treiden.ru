import Post from "./Post"


const ExtraPosts = ({posts, section}) => {
	return (
		posts.filter(post=>[section, "HF"].includes(post.extra_display_section)).map((post) => (
			post.url
				? <a
					id={post.slug}
					className={`extra-post section-${section} post-link white centered`}
					key={post.slug}
					href={post.url}
					target="_blank"
					rel="noreferrer"
				>
					<Post item={post}/>
				</a>
				: <div id={post.slug} className={`extra-post section-${section} white centered`}>
					<Post item={post}/>
				</div>
		))
	)
}

export default ExtraPosts
