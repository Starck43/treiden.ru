import {memo} from "react"
import {Info, Map} from "~/components/contacts"
import ExtraPosts from "../extra-posts/ExtraPosts"

import style from "~/styles/contacts.module.sass"


const Contacts = ({contacts, extra}) => {
	return (
		<footer id="contacts" className={style.section}>
			<div className={`extra-posts ${style.leftBlock}`}>
				<ExtraPosts posts={extra} sections={["F", "HF"]} />
			</div>
			{contacts.length &&
			<>
				<Info contact={contacts[0]}/>
				<Map image={contacts[0]?.file}/>
			</>
			}
		</footer>
	)
}

export default memo(Contacts)
