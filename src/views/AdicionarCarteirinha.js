import AddCard from '../components/upload/AddCard'
import styled from "styled-components";

const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height:100vh;
`

export default function AdicionarCarteirinha(){
    return(
        <MainContainer>
            <AddCard/>
        </MainContainer>
        
    )
}

