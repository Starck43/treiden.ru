import React, {useEffect, useState} from "react"
import Link from "next/link"
import Image from "next/image"

import {Section, Header, Icon} from "~/components/UI"
import {List} from "~/components/projects"
import VideoPlayer from "../UI/VideoPlayer"
import {HtmlContent} from "../UI/HtmlContent"

import {getLinkType, createThumbUrl} from "~/core/helpers/utils"

import style from "~/styles/portfolio.module.sass"


const remoteLoader = ({src, width}) => {
	let breakpoints = [320, 450]
	if (breakpoints.indexOf(width) !== -1)
		return createThumbUrl(src, width)
	return src
}


const PortfolioDetail = ({category, projects}) => {
	const link = getLinkType(category.url)
	const [videoState, setVideoState] = useState(null)

	useEffect(() => {
		link.type === "youtube" &&
		setVideoState({
			[category.id]: {
				id: category.id,
				url: category?.url || null,
				ended: false,
				loaded: 0,
				played: 0,
				playing: false
			}
		})
	}, [link, category])

	return (
		<Section>
			<Header>{category.name}</Header>
			<div className={style.content}>
				{category.file &&
				<Image className={style.flexImage}
				       loader={remoteLoader}
				       src={category.file}
				       alt={category.name}
				       layout="intrinsic"
				       width={450}
				       height={300}
				       quality={80}
				/>
				}

				<HtmlContent className={`${category.file ? style.flexDescription : style.description}`}>
					{category.description}
				</HtmlContent>

				{link.type === "youtube" && (
					<div className={style.media}>
						{category.cover &&
						<Image
							className={style.image}
							loader={remoteLoader}
							src={category.cover}
							alt={category.name}
							layout="intrinsic"
							objectFit="cover"
							width={450}
							height={300}
							quality={80}
						/>
						}
						{videoState && (
							<VideoPlayer
								id={category.id}
								playerState={videoState}
								setPlayerState={setVideoState}
							/>
						)}
					</div>
				)}
			</div>

			{projects.length > 0 &&
			<List projects={projects} title="Проекты"/>
			}

			<Link href="/#activities"><a className="nav-link"><Icon name="arrow_left" className="nav-arrow left"/>На
				главную</a></Link>
		</Section>
	)
}

export default PortfolioDetail
