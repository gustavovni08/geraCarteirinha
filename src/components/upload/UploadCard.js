import styled from "styled-components"
import { useState, useEffect } from "react"
import SelectContainer from "../form/SelectContainer"
import ButtonContainer from "../utils/ButtonContainer"
import * as XLSX from 'xlsx';
import BusinessCard from "../card/BusinessCard";
import PersonalCard from "../card/Personalcard";
import { Provider, useRefContext } from "../../services/context";


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
`

function UploadCard(){

    const [file, setFile] = useState(null)
    const [tipo, setTipo] = useState('Individual')
    const [empresa, setEmpresa] = useState('Veloo')
    const [lista, setLista] = useState([])
    const [show, setShow] = useState(false)
   
    // const {reflist, setReflist} = useRefContext()


    const options = [
        { value: 'Individual', label: 'Individual'},
        { value: 'Empresarial', label: 'Empresarial'}
    ]

    const Empresas = [
        { value: 'Veloo', label: 'Veloo'},
        { value: 'Itelx', label: 'Itelx'},
        { value: 'MaisTV', label: 'MaisTV'},
        { value: 'Sitramico', label: 'Sitramico'},
        { value: 'Colégio Santa Úrsula', label: 'Colégio Santa Úrsula'},
        { value: 'Sindhal', label: 'Sindhal'},
        { value: 'UPM', label:'UPM'},
        { value: 'Sindprev', label:'Sindprev'},
        { value: 'Pele', label:'Pele'},
    ]

    const tratarDadosDaPlanilha = () => {
        if(file){
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, {type: 'array'});
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const dataJson = XLSX.utils.sheet_to_json(sheet);

                const values = dataJson.map(row => {
                    const cellValue = row[Object.keys(row)[0]];
                    if (typeof cellValue === 'string') {
                        const splitValues = cellValue.split(' ');
                        if (splitValues.length > 1) {
                            return splitValues[0] + ' ' + splitValues[splitValues.length - 1];
                        }
                    }
                    return cellValue;
                });
                setLista(values);
                console.log(values);
                setShow(true)
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const gerarCodigo = () => {
        const codigo = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000
        return codigo
    }

    // useEffect(()=>{
    //     setReflist(lista)
    // }, [])


    return(
        <Provider>
        <div>
            { !show && (<UploadCardContainer>
            <SelectContainer
                value={tipo}
                label='Tipo'
                options={options}
                onChange={(event) => (setTipo(event.target.value))}
            />

            {tipo === 'Empresarial' &&
                <SelectContainer
                    value={empresa}
                    label='Empresa'
                    options={Empresas}
                    onChange={(event) => (setEmpresa(event.target.value))}
                />
            }
            
            <div>
                <input 
                    type="file"
                    accept=".xlsx" 
                    onChange={(event) => (setFile(event.target.files[0]))}
                />
            </div>

            <ButtonContainer 
                onClick={tratarDadosDaPlanilha}
                title="Gerar"
            />
        </UploadCardContainer>)}

        {show && tipo === 'Individual' && (
            lista.map((item, index) => (
            <PersonalCard key={index} nome={item} codigo={gerarCodigo()} />
            ))
        )}

        {show && tipo === 'Empresarial' && (
            <>
                {lista.map((item, index) => (
                    <BusinessCard 
                    key={index} 
                    nome={item} 
                    codigo={gerarCodigo()} 
                    empresa={empresa} 
                    mostrarBotao={true}
                    /> ))}
                
                {/* <ButtonContainer title='Exportar Tudo' onClick={() => console.log(reflist)}/> */}
            </>
        )}

        

        </div>
        </Provider>
        
    );
}

export default UploadCard;
