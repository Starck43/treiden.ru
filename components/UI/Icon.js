import styled from "styled-components/macro"


export const SvgIcon = ({id, className=""}) => (
	<svg viewBox="0 0 46 20" className={`svg-icon ${className}`}>
		<use xlinkHref={id}/>
	</svg>
)


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
