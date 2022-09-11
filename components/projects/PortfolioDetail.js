import {useEffect, useState} from "react"
import Link from "next/link"

import {List} from "~/components/projects"
import {getLinkType} from "~/core/helpers/utils"
import {Cover, VideoPlayer, HtmlContent, Section, Header} from "../UI"
import {SvgIcon} from "../UI/Icon"

import style from "~/styles/portfolio.module.sass"


const PortfolioDetail = ({category, projects}) => {
	const link = getLinkType(category?.url)
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
				<Cover className={style.flexImage}
				       src={category.file}
				       alt={category?.name}
				       sizes={[320, 450]}
				       layout="intrinsic"
				       width={450}
				       height={300}
				/>
				}

				<HtmlContent className={`${category.file ? style.flexDescription : style.description}`}>
					{category.description}
				</HtmlContent>

				{link.type === "youtube" && (
					<div className={style.media}>
						{category.cover &&
						<Cover
							className={style.image}
							src={category.cover}
							alt={category?.name}
							sizes={[320, 450]}
							layout="intrinsic"
							width={450}
							height={300}
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

			<Link href="/#activities">
				<a className="nav-link back">
					<SvgIcon id="#check-mark-icon" className={`check-mark arrow arrow-left`}/>
					На главную
				</a>
			</Link>
		</Section>
	)
}

export default PortfolioDetail
