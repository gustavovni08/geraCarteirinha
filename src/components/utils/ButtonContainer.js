import styled from "styled-components"

const MainContainer = styled.div`

    display:flex;
    align-items: center;
    justify-content: center;
    width: 65%;
    margin: 30px;

`

const StyledButton = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    background-color: #2E9AFE;
    
    height: 40px;
    width: 400px;
    padding: 14px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    color: #fff;
    font-size: 22px;
    font-weight: bold;

    cursor:pointer;

    &:hover{
        background-color:#58ACFA
    }
`


function ButtonContainer(props){

    const {title, onClick} = props

    return(
        <MainContainer>
            <StyledButton 
            onClick={onClick}>
                {title}
            </StyledButton>
        </MainContainer>
    )
}

export default ButtonContainer