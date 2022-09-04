import useSWR from "swr"
import {cleanDoubleSlashes} from "../helpers/utils"

const fetcher = url => fetch(url).then(res => res.json())

const Fetch = (server, endpoint, params = {}) => {
	let url = cleanDoubleSlashes(server + endpoint)
	if (!url) return {data: null, error: "Пустой запрос к серверу"}

	if (Object.keys(params).length) {
		params = new URLSearchParams(params)
		url = url + "?" + params.toString()
	}

	const {data, error} = useSWR(url, fetcher)
	return {data, error}
}

export default Fetch