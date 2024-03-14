import styled from "styled-components";
import MenuCard from "../components/menu/MenuCard";

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
`


function Menu(){
    return(
        <MainContainer>
            <MenuCard
            title="Individual"
            navigate="Individual"/>
            <MenuCard
            title="Em Lote"
            navigate="emLote"/>
        </MainContainer>
        
    )
}

export default Menu