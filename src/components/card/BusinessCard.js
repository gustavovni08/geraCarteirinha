import React, { useRef, useState, useEffect } from 'react';
import card from '../../assets/BusinessCard.png';
import styled from 'styled-components';
import ButtonContainer from '../utils/ButtonContainer';
import html2canvas from 'html2canvas';

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #d9d9d9;
`;

const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 60px;
`;

const ImageContainer = styled.img`
    width: 400px;
`;

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
`;

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
`;

const LogoContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    z-index:1000;
    height:0px;
    top: -189px;
    width: 80%;
`;

const LogoImg = styled.img`
    max-width: 110px;
    max-height: 70px;
`;

const BusinessCard = React.forwardRef((props, ref) => {
    const { nome, codigo, mostrarBotao, link } = props;
    const cardRef = useRef(null);
    const [logoBase64, setLogoBase64] = useState(null);

    const loadImageAsBase64 = async (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = url;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = reject;
        });
    };

    useEffect(() => {
        const loadLogo = async () => {
            try {
                const base64 = await loadImageAsBase64(link);
                setLogoBase64(base64);
            } catch (error) {
                console.error("Erro ao carregar imagem como Base64:", error);
            }
        };
        loadLogo();
    }, [link]);

    const handleDownload = async () => {
        try {
            const canvas = await html2canvas(cardRef.current);
            const image = canvas.toDataURL('image/png');

            const link = document.createElement("a");
            link.href = image;
            link.download = "carteirinha.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <MainContainer>
            <CardContainer ref={cardRef}>
                <ImageContainer src={card} alt='hbcard'/>
                <NomeLabel>{nome}</NomeLabel>
                <CodeLabel>{codigo}</CodeLabel>
                <LogoContainer>
                    {logoBase64 && <LogoImg src={logoBase64} alt='logo' />}
                </LogoContainer>
                <p>Central de Agendamento: (82) 99935-3701</p>
            </CardContainer>

            {mostrarBotao && (
                <ButtonContainer title='Download' onClick={handleDownload}/>
            )}
        </MainContainer>
    );
});

export default BusinessCard;
