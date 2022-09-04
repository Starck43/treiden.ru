
export async function fetchEvents(page= 1) {
	const res = await fetch(process.env.API_SERVER+'/events/?page='+page)
	return await res.json()
}