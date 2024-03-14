import styled from "styled-components"
import { useNavigate } from "react-router-dom"

const MenuCardContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    width: 450px;
    height: 150px;
    padding: 14px;
    border-radius: 8px;
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    margin-bottom: 40px;
    font-size: 22px;

    &:hover{
        background-color: #f1f1f9;
    }

`

function MenuCard(props){

    const {title, navigate} = props

    const navigator = useNavigate()

    return(
        <MenuCardContainer
        onClick={() => (navigator(`/${navigate}`))}
        >
            {title}
        </MenuCardContainer>
    )
}

export default MenuCard