import {useEffect, useState} from "react"
import {useRouter} from "next/router"
import Link from "next/link"
import styled from "styled-components/macro"
import {Ratio} from "react-bootstrap"

import Loading from "~/components/Loading"
import {getYouTubeID, absoluteUrl, truncateHTML} from "~/core/helpers/utils"
import {FetchError} from "~/core/api"

import {Cover, VideoPlayer, HtmlContent, Section} from "~/components/UI"
import {SvgIcon} from "../UI/Icon"



const SearchList = () => {
	const router = useRouter()
	const [videoState, setVideoState] = useState(null)
	const [searchResult, setSearchResult] = useState(null)
	const [error, setError] = useState(null)
	const [isLoading, setLoading] = useState(true)

	const videoClickHandle = () => {
		/*		let currentState = videoState[post.id]
				currentState.playing = !videoState.playing
				setVideoState({
					...videoState,
					[post.id]: currentState
				})
		*/
	}

	useEffect(() => {
		const params = new URLSearchParams(router.query).toString()
		fetch(process.env.API_SERVER + process.env.SEARCH_ENDPOINT + "?" + params)
			.then(res => res.json())
			.then(data => {
				setSearchResult(data)
				setLoading(false)

				if (data) {
					setVideoState(
						data?.reduce((acc, value) => {
							if (getYouTubeID(value.url)) {
								acc[value.id] = {
									id: value.id,
									url: value.url,
									loaded: 0,
									played: 0,
									playing: false,
									ended: false,
								}
							}
							return acc
						}, {})
					)
				} else {
					setVideoState([])
				}
			})
			.catch(error => {
				setError(error)
				setLoading(false)
				console.log(error)
			})

	}, [router.query])

	if (error) return <FetchError error={error}/>
	if (isLoading) return <Loading/>

	return (
		<Section className="search-result-section">
			<header className="mt-5 mb-3">
				<h1>Вы искали: {decodeURI(router.query["q"])}</h1>
			</header>

			{searchResult &&
			<p>Найдено записей: {String(searchResult?.length)}</p>
			}

			<Container>
				{searchResult
					? searchResult.map(post =>
						<Item key={post.slug}>
							<h3 className="mb-3">
								{post.url && <Link href={post.url}><a>{post.title}</a></Link>}
							</h3>
							<HtmlContent>
								{post.excerpt || post.description && truncateHTML(post.description, 300)}
							</HtmlContent>

							{post.cover || videoState && videoState[post.id]
								? <Ratio className="cover mt-3" aspectRatio="16x9" onClick={videoClickHandle}>
									<>
										{post.cover &&
										<Cover
											src={absoluteUrl(post.cover)}
											alt={post?.title}
											sizes={[320, 450]}
											layout="fill"
											width={450}
											height={360}
											objectPosition="left"
										/>
										}

										{videoState && videoState[post.id] &&
										<VideoPlayer
											id={post.id}
											playerState={videoState}
											setPlayerState={setVideoState}
										/>
										}
									</>
								</Ratio>
								: null
							}

							<p className="mt-4 mb-4">
								{post.link && (!post.url || post.url && getYouTubeID(post.url))
									? (
										<Link href={post.link} passHref><a>
											{post.post_type === "post" || post.post_type === "category"
												? `Перейти`
												: post.post_type === "post" ? `Перейти к мероприятию` : `Перейти к проекту`
											}
										</a></Link>
									)
									: (
										post.url &&
										<Link href={post.url} passHref><a>Перейти на сайт</a></Link>
									)
								}
							</p>
						</Item>
					)
					: <p>К сожалению, по Вашему запросу ничего не найдено.</p>
				}
			</Container>

			<a className="nav-link back" onClick={() => router.back()}>
				<SvgIcon id="#check-mark-icon" className={`check-mark arrow arrow-left`}/>
				<span>Вернуться назад</span>
			</a>
		</Section>
	)
}


export default SearchList


const Container = styled.ul`
	padding: 0;
`
const Item = styled.li`
	padding: 1.5rem 0;
	border-top: 1px solid rgba(0, 0, 0, .2);

`