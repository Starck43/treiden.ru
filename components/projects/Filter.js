import Link from "next/link"

import style from "~/styles/portfolio.module.sass"


const Filter = ({categories}) => (
	<div className={style.filter}>
		{categories.map(item =>
			<div className={style.filterItem} key={item.slug}>
				<Link href={`/projects/${item.slug}`}><a className={`${style.filterLink}`}>{item.name}</a></Link>
			</div>
		)}
	</div>
)


export default Filter

