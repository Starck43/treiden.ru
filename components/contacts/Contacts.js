import {memo} from "react"

import {Info} from "./Info"
import {Map} from "./Map"
import ExtraPosts from "/components/posts/ExtraPosts"

import style from "./Contacts.module.sass"


const Contacts = ({contacts, extra}) => (
	<footer id="contacts" className={style.section}>
		<div className={`extra-posts ${style.leftBlock}`}>
			<ExtraPosts posts={extra} sections={["F", "HF"]}/>
		</div>
		{contacts.length &&
		<>
			<Info contact={contacts[0]}/>
			<Map image={contacts[0]?.file}/>
		</>
		}
	</footer>
)


export default memo(Contacts)
