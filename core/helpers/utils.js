//convert an array from one dimensional to two dimensional
export const convert2DimensionalArray = (arr, len) => {
	const res = []
	for (let i = 0; i < Math.ceil(arr.length / len); i++) {
		res.push(arr.slice(i * len, (i + 1) * len))
	}
	return res
}

export const getWindowDimensions = () => {
	if (typeof window !== "undefined") {
		let w = window.innerWidth

		const getMediaScreen = () => {
			switch (true) {
				case w < 576:
					return "xs"
				case w >= 576 && w < 768:
					return "sm"
				case w >= 768 && w < 992:
					return "md"
				case w >= 992 && w < 1200:
					return "lg"
				default:
					return "xl"
			}
		}
		return {
			width: window.innerWidth,
			height: window.innerHeight,
			ratio: window.innerWidth / window.innerHeight,
			media: getMediaScreen()
		}
	}
	return {
		width: 0,
		height: 0,
		ratio: 0
	}
}


export const getYear = () => {
	return new Date().getFullYear()
}

export const getHostname = (url) => {
	let name = ""
	if (url) {
		let hostname = new URL(url.toLowerCase()).hostname.split(".")
		name = hostname[0]
		if (hostname.length > 1 && name === "www") name = hostname[1]
	}
	return name
}


export const getYouTubeID = (url) => {
	if (!url) return null
	url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
	return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : null
}


export const getLinkType = (url) => {
	if (!url) return {type: null, id: null}

	const link = {
		type: "youtube",
		id: getYouTubeID(url)
	}

	if (!link.id) {
		let ext = url.split(".").pop()
		link.type = (ext.toLowerCase() === "jpg" || ext.toLowerCase() === "png") ? "image" : "link"
	}
	return link
}


export const smoothScroll = (target, offset) => {
	if (typeof target === 'string') {
		target = document.querySelector(target.replace(/^\/|\/$/g, ''))
	}
	if (!target) return null

	let topPosition = target.getBoundingClientRect().top

	typeof window !== "undefined" && window.scrollTo({
		top: topPosition + window.pageYOffset + offset,
		behavior: "smooth"
	})
}

export const createThumbUrl = (src, width) => {
	let path = src?.split(".")
	if (path && path.length > 1) {
		let ext = path.pop()
		let thumbName = "_" + width + "w"
		return path.join(".") + thumbName + "." + ext
	}
	return src
}


export const createSrcSet = (src = null, arr = []) => {
	if (!src) return null
	let srcset = arr.reduce((acc, next) => {
		return acc + createThumbUrl(src, next) + ` ${next}w,`
	}, "")
	return srcset.slice(0, -1)
}


export const cleanDoubleSlashes = (str) => str.replace(/([^:]\/)\/+/g, "$1")

export const absoluteUrl = (host, url) => {
	if (url && url.indexOf("http", 0) === -1) return host + url
	return url
}

export const truncateHTML = (value = null, n = 200) => {
	if (!value) return ""

	let t = value.substring(0, n) // first cut
	let tr = t.replace(/<(.*?[^\/])>.*?<\/\1>|<.*?\/>/, "") // remove opened+closed tags
	tr = tr.replace(/\s+/g, " ").trim() // remove opened+closed tags
	// capture open tags
	let ar = tr.match(/<((?!li|hr|img|br|area|base|col|command|embed|input|keygen|link|meta|head|param|source|track|wbr).*?)>/g)

	if (ar) return t + "&hellip;" + ar.reverse().join("").replace(/</g, "<\/") // close tags
	return value
}
