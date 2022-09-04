import React from "react"
import styled from "styled-components/macro"


const Icon = ({name, className, children}) => (
	<Symbol className={className} name={name}>
		{children}
	</Symbol>
)

export default Icon

const Symbol = styled.span`
	display: inline-flex;

	&::before {
		font-family: ${props => props.theme.fonts.fontIp};
		font-style: normal;
		font-weight: normal;
		content: '${({theme, name}) => theme.icons[name]}';
	}
`
