
export const isSafari = () => {
	var userAgent = navigator.userAgent.toLowerCase()
	return /^((?!chrome|android).)*safari/i.test(userAgent)
}


export const getWindowDimensions = () => {
	if (typeof window === 'undefined') {
		return { width: null, height: null}
	}
	const { innerWidth: width, innerHeight: height } = window
	return { width, height }
}


export const getYear = () => {
	return new Date().getFullYear();
}

export const getHostname = (url) => {
	let name = ''
	if (url) {
		let hostname = new URL(url.toLowerCase()).hostname.split('.')
		name = hostname[0]
		if (hostname.length > 1 && name == 'www') name = hostname[1]
	}
	return name
}


export const getYouTubeID = (url) => {
	url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
	return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : null //url[0]
}


export const getLinkType = (url) => {
	if (!url) return {type: null, id: null}

	var link = {
		type: 'youtube',
		id: getYouTubeID(url)
	}

	if (!link.id) {
		var ext = url.split('.').pop()
		link.type = (ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'png') ? 'image' : 'link'
	}
	return link
}


export const scrollToRef = (ref, offset=0) => window.scrollTo(offset, ref.current.offsetTop)


export const createThumbUrl = (src, width) => {
	let path = src.split('.')
	if (path.length > 1) {
		let ext = path.pop()
		let thumbName = '_' + width + 'w'
		let thumbSrc = path.join('.') + thumbName + '.' + ext

		return thumbSrc
	}
	return src
}

/*export const toAbsoluteUrl = (content, baseUrl) => {
	return replace(content, baseUrl)
}
*/


