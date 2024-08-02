import React, {useRef } from 'react';
import { useEffect } from 'react';
import card from '../../assets/BusinessCard.png'
import styled from 'styled-components'
import ButtonContainer from '../utils/ButtonContainer'
import html2canvas from 'html2canvas';
import { useRefContext } from '../../services/context';


const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #d9d9d9;
`

const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 60px;
`

const ImageContainer = styled.img`
    width: 400px;
`

const NomeLabel = styled.div`
    position: relative;
    z-index: 1000;
    top: -90px;
    display: flex;
    justify-content:flex-end;
    width:70%;
    font-weight: 600;
    color:#fff;
    height:0px;
    
`

const CodeLabel = styled.div`
    position: relative;
    z-index: 1000;
    top: -70px;
    display: flex;
    justify-content:flex-end;
    width:70%;
    font-weight: 500;
    color:#fff;
    height:0px;    
`

const LogoContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    z-index:1000;
    height:0px;
    top: -189px;
    width: 80%;


`

const LogoImg = styled.img`
    max-width: 110px;
    max-height: 70px;
`


const BusinessCard = React.forwardRef((props, ref) => {
    
    const { nome, codigo, empresa, mostrarBotao } = props;
    const cardRef = useRef(null);
    const {setReflist, reflist} = useRefContext()


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

    useEffect(()=>{
        console.log(reflist)
    }, [])

    return(
        <MainContainer>
            <CardContainer ref={cardRef}>
                <ImageContainer src={card} alt='hbcard'/>
                <NomeLabel>{nome}</NomeLabel>
                <CodeLabel>{codigo}</CodeLabel>
                <LogoContainer>
                    <LogoImg src={require(`../../assets/${empresa}.png`)} alt='logo'/>
                </LogoContainer>
                <LogoContainer/>
                <text>Central de Agendamento: (82) 99935-3701</text>
            </CardContainer>

            {mostrarBotao === true && (
                <ButtonContainer title='Download' onClick={handleDownload}/>
            )} 
            
        </MainContainer>
)
    })

    export default BusinessCard
