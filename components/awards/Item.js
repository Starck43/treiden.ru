import Cover from "../UI/Cover"

import style from "~/styles/awards.module.sass"


const Item = ({award}) => {
	return (
		award.file &&
		<figure id={award.id} className={style.cover}>
			<Cover
				src={award.file}
				sizes={[320, 450, 640]}
				alt={award?.title}
				layout="intrinsic"
				width={320}
				height={450}
			/>
		</figure>
	)
}

export default Item
