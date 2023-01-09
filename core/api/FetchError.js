import styled from "styled-components"

const FetchError = ({error}) => {
	return (
		<Container>
			<Content>{error.toString()}</Content>
		</Container>
	)
}

export default FetchError

const Container = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 50%;
	text-align: center;
	transform: translateY(-50%);
	background-color: ${props => props.theme.colors.colorLight};
`
const Content = styled.div`
	position: relative;
	float: left;
	top: 50%;
	left: 50%;
	max-width: 800px;
	transform: translate(-50%, -50%);
`
