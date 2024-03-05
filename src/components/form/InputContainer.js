import styled from "styled-components"

const MainContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 60%;
`

const StyledInput = styled.input`
    width: 100%;
    height: 30px;
    border-radius: 4px;
    border-style: solid;
    margin-bottom: 10px;
`

const LabelContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 10px;
`

function InputContainer(props){

    const {label, placeholder, value, onChange} = props

    return(
        <MainContainer>
            <LabelContainer>
            <label>{label}:</label>
            </LabelContainer>
            <StyledInput
            placeholder={placeholder}
            value={value}
            onChange={onChange}/>
        </MainContainer>
        
    )
}

export default InputContainer