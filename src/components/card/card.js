import React ,{ useRef } from 'react';
import card from '../../assets/card.png'
import styled from 'styled-components'
import ButtonContainer from '../utils/ButtonContainer'
import html2canvas from 'html2canvas';


const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const ImageContainer = styled.img`
    max-width: 500px;
`

const NomeLabel = styled.p`
    position: relative;
    z-index: 1000;
    top: -250px;
    left: -40px;
`

const CodeLabel = styled.p`
    position: relative;
    z-index: 1000;
    top: -270px;
    left: -84px;
`

function Card(props){

    const cardRef = useRef(null);

    const {nome, codigo} = props

    const handleDownload = async () => {
        try {
            const canvas = await html2canvas(cardRef.current)
            const image = canvas.toDataURL('image/png')

            window.open(image)

            const link = document.createElement("a")
            link.href = image
            link.download = "carteirinha.png"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <MainContainer>
            <CardContainer ref={cardRef}>
                <ImageContainer src={card} alt='hbcard'/>
                <NomeLabel>{nome}</NomeLabel>
                <CodeLabel>{codigo}</CodeLabel>
            </CardContainer>
            
            <ButtonContainer title='Download' onClick={handleDownload}/>
        </MainContainer>
    )
}

export default Card