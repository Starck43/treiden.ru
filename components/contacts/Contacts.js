import React from "react"

import ExtraPosts from "./ExtraPosts"
import {Info, Map} from "~/components/contacts"


import style from "~/styles/contacts.module.sass"


const Contacts = ({contacts, posts}) => {
	return (
		<footer id="contacts" className={style.section}>
			<div className={`extra-posts ${style.leftBlock}`}>
				<ExtraPosts posts={posts}/>
			</div>
			<Info contact={contacts[0]}/>
			<Map image={contacts[0].file}/>
		</footer>
	)
}

export default Contacts

