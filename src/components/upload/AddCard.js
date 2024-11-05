import styled from "styled-components";
import InputContainer from "../form/InputContainer";
import { useState } from "react";
import ButtonContainer from "../utils/ButtonContainer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadCardContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #fff;
    width: 450px;
    height: 350px;
    padding: 14px;
    border-radius: 8px;
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.1);
    margin-bottom: 40px;
    font-size: 22px;
`;


function AddCard() {

    const navigate = useNavigate()
    const [file, setFile] = useState(null);
    const [nome, setNome] = useState('');

    async function postConvenio() {
        try {
            // Verifica se o arquivo e o nome foram definidos
            if (!file || !nome) {
                window.alert("Por favor, preencha o nome e selecione um arquivo.");
                return;
            }

            // Cria uma instância de FormData para enviar o arquivo e o nome
            const formData = new FormData();
            formData.append("nome", nome);
            formData.append("imagem", file); // 'imagem' deve corresponder ao nome do campo no servidor

            await axios.post('https://api.hbcard.com.br/convenios', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Upload feito com sucesso');
            window.alert("Upload feito com sucesso!");
            navigate('/')

        } catch (error) {
            console.error("Erro no upload:", error);
            window.alert("Erro ao fazer upload, tente novamente.");
        }
    }

    return (
        <div>
            <UploadCardContainer>
                <InputContainer
                    label="Digite o nome do convenio"
                    placeholder="Nome do convenio"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                />
                <div>
                    <input
                        type="file"
                        accept=".png"
                        onChange={(event) => setFile(event.target.files[0])}
                    />
                </div>

                <ButtonContainer
                    onClick={postConvenio}
                    title="Adicionar"
                />
            </UploadCardContainer>
        </div>
    );
}

export default AddCard;
