import {cleanDoubleSlashes} from "../helpers/utils"

export async function fetchEvents(page= 1) {
	const res = await fetch(cleanDoubleSlashes(process.env.API_SERVER+'/events/?page='+page))
	return await res.json()
}
