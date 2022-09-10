import ReactPlayer from "react-player/lazy"
import ProgressBar from "react-bootstrap/ProgressBar"
import {useState} from "react"


const VideoPlayer = ({id, sliderRef=null, playerState, setPlayerState=null}) => {
	const [isReady, setReady] = useState(false)

	const handleOnReady = () => {
		setReady(true)
/*		let iframes = document.querySelectorAll('iframe')
		iframes.forEach(el=>{
			let iframeDoc = el.contentWindow.document
			let overlay = iframeDoc.querySelector('.ytp-pause-overlay')
			overlay.style.display = "none"
			console.log("iframe", overlay)
		})*/
	}

	const handleOnPlay = () => {
		let newState = playerState[id]

		if (!newState.playing) {
			newState.playing = true

			setPlayerState && setPlayerState({
				...playerState,
				[id]: newState,
			})
		}
	}


	const handleOnPause = () => {
		let newState = playerState[id]

		if (newState.playing) {
			newState.playing = false

			setPlayerState && setPlayerState({
				...playerState,
				[id]: newState,
			})
		}
	}


	const handleProgress = (state) => {
		let newState = playerState[id]

		// detect video position before a second to ending
		let elapsed = newState.ref?.current.getDuration() - newState.ref?.current.getCurrentTime()
		if (!newState.ended && elapsed <= 1) {
			newState.ended = true
			// go to the next slide 
			sliderRef && sliderRef.autoplay?.start()
		}

		newState.played = state.played
		newState.loaded = state.loaded

		setPlayerState && setPlayerState({
			...playerState,
			[id]: newState,
		})

	}


	return (
		playerState && ReactPlayer.canPlay(playerState[id]?.url) &&
		<div className={`player ${isReady ? "ready" : ""}`} data-player-id={id}>
			<ProgressBar>
				<ProgressBar now={playerState[id].played * 100} bsPrefix="played"/>
				<ProgressBar
					now={(playerState[id].loaded - playerState[id].played) * 100}
					bsPrefix="loaded"/>
			</ProgressBar>
			<ReactPlayer
				ref={playerState[id].ref}
				className={`react-player`}
				url={playerState[id].url}
				width="100%"
				height="100%"
				volume={0.5}
				muted={false}
				loop
				playing={playerState[id].playing}
				onReady={handleOnReady}
				onPlay={handleOnPlay}
				onPause={handleOnPause}
				onProgress={handleProgress}
				config={{
					youtube: {
						controls: 3,
						enablejsapi: 1,
						playsInline: 1,
						rel: 0,
						showInfo: 0,
						color: "black",
						modestBranding: 1,
						origin: typeof window !== "undefined" && window.location.origin
					},
					vimeo: {
						autoPlay: false,
						playsInline: true,
						autoPause: true,
						responsive: true,
					},
					file: {
						attributes: {
							playsInline: true,
							autoPlay: false,
							preload: "metadata",
						}
					}
				}}
			/>
		</div>
	)
}

export default VideoPlayer