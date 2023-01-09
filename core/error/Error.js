import {General, NotFound, InternalServer} from "/core/error"

import style from "./Error.module.sass"


const Error = ({statusCode}) => {
	return (
		<div className={style.container}>
			<div className={style.content}>
				{renderError(statusCode)}
			</div>
		</div>
	)
}

const renderError = statusCode => {
	switch (statusCode) {
		case 404:
			return <NotFound/>
		case 500:
			return <InternalServer/>
		default:
		case undefined:
			return <General/>
	}
}

export default Error
