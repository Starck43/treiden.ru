import Link from "next/link"
import {Col} from "react-bootstrap"
import styled from "styled-components/macro"

import style from "~/styles/activity.module.sass"


const Item = ({activity}) => {
	return (
		<Col xs={12} md={6}>
			<Article className={style.activity}>
				<Title className={style.header}>
					<h2 className={style.title}>
						{activity.name}
					</h2>
				</Title>

				<Paragraph className={style.description}>
					{activity.excerpt}
				</Paragraph>

				<Footer className={style.footer}>
					<Button>
						<Link href={`/projects/${activity.slug}`}><a>Перейти в раздел</a></Link>
					</Button>
				</Footer>
			</Article>
		</Col>
	)
}


export default Item


const Button = styled.button``
const Title = styled.header``
const Article = styled.article``
const Paragraph = styled.p``
const Footer = styled.div``


