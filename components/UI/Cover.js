import {memo, useCallback, useEffect, useState} from "react"
import Image from "next/image"

import {createSrcSet, createThumbUrl} from "../../core/helpers/utils"

import style from "~/styles/cover.module.sass"


const Cover = ({
	               src,
	               alt,
	               sizes = [],
	               width = 16,
	               height = 9,
	               layout = "responsive",
	               objectFit = "cover",
	               imageLoading = null,
	               id = null,
	               className = "",
	               ...props
               }) => {

	const [isLoaded, setLoaded] = useState(false)
	const [thumb, setThumb] = useState(src)
	const [srcset, setSrcset] = useState([])

	useEffect(() => {
		setSrcset(createSrcSet(src, sizes))
		setThumb(sizes.length > 0 ? createThumbUrl(src, sizes[0]) : src)
	}, [src, sizes])

	const loadComplete = useCallback(() => {
		setLoaded(true)
		imageLoading?.(true)
	},[imageLoading])

	return (
		thumb &&
		<Image
			id={id}
			className={`${style.image} ${isLoaded ? style.loaded : ""} ${className}`}
			src={thumb}
			srcset={srcset}
			alt={alt || ""}
			layout={layout}
			width={layout === "fill" ? undefined : width}
			height={layout === "fill" ? undefined : height}
			quality={80}
			objectFit={objectFit}
			onLoadingComplete={loadComplete}
			//placeholder="blur"
			//blurDataURL={thumb}
			unoptimized
			{...props}
		/>
	)

}

export default memo(Cover)
