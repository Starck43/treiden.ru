import {Icon} from "~/components/UI"

import style from "~/styles/contacts.module.sass"


const Info = ({contact}) => {
	return (
		<div className={`contacts-container ${style.centerBlock}`}>
			<div className="contact-block">
				<Icon name="envelope" className="icon"/>
				<a className="white" href={`mailto:${contact.email}`}>{contact.email}</a>
			</div>

			<div className="contact-block">
				<Icon name="phone" className="icon"/>
				<a className="white" href={`tel:${contact.phone}`}>{contact.phone}</a>
				{contact?.add_contact &&
				<div className="add-contact">
					<Icon name="mobile" className="icon"/>
					{contact.add_contact}
				</div>
				}
			</div>

			<div className="contact-block">
				<Icon name="location" className="icon"/>
				{contact.address}
			</div>

			<div className="socials">
				{
					contact?.socials.map((item) => (
						<a className="social-link white" key={item.name} href={item.url}>
							<Icon name={item.name.toLowerCase()} className={`${style.social} social-icon centered`}/>
						</a>
					))
				}
			</div>
		</div>
	)
}

export default Info


