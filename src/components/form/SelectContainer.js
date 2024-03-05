import styled from "styled-components"
import InputMask from 'react-input-mask';

const MainContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 60%;
`

const StyledInput = styled.select`
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

function SelectContainer(props){

    const {label, value, options, onChange} = props

    return(
        <MainContainer>
            <LabelContainer>
                <label>{label}:</label>
            </LabelContainer>
            
            <StyledInput
            value={value}
            onChange={onChange}>
                {options.map(option => (
                    <option value={option.value}>
                        {option.label}
                    </option>
                ))}
            </StyledInput>
        </MainContainer>
        
    )
}

export default SelectContainer