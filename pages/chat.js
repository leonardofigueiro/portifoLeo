import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    const [message, setMessage] = React.useState('');
    const [listMessage, setlistMessage] = React.useState([])

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            id: listMessage.length + 1,
            from: 'leonardofigueiro',
            text: novaMensagem,

        }
        setlistMessage([
            mensagem,
            ...listMessage,

        ]);
        setMessage('');
    }
    function delMessage(idMensagem){
        const id = listMessage.id
        console.log(id)
    }

    
    /*
     // O usuário digita no campo textarea
     // Aperta enter para enviar
     //tem que adicionar o texto na listagem
 
     // ./Sua lógica vai aqui
     */
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listMessage} />
                    {/* message={listMessage.map((atual) => {
                        
                        return (
                            <li key={atual.id}>{atual.from} : {atual.text}</li>
                        )
                    })}  */}
                        {delMessage()}
                    <Box
                        as="form"
                        onSubmit={(a)=> {
                            a.preventDefault();
                            handleNovaMensagem(message)
                        }}
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={message}
                            onChange={(a) => {
                                const msg = a.target.value;
                                setMessage(msg);
                            }}
                            onKeyPress={(a) => {
                                if (a.key === 'Enter') {
                                    a.preventDefault();
                                    handleNovaMensagem(message);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '90%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button  
                            iconName="arrowRight"
                            type='submit'
                            
                            buttonColors={{
                                contrastColor: '#FFFFFF',
                                mainColor: '#C65D21',
                                mainColorLight: '#E67635',
                                mainColorStrong: '#AB4E19'
                            }}
                            styleSheet={{
                                marginBottom: "10px"
                            }}
                                
                            />
                        
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >   
            {props.mensagens.map((mensagem) => {
                
                return (
                    <Text
                        tag="li"
                        key={mensagem.id}
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            marginRight: '5px',
                            backgroundColor: appConfig.theme.colors.neutrals[500],
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        > 


                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.from}.png`}
                            />
                            <Text tag="strong" styleSheet={{ display: 'inline' }}>
                                {mensagem.from}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    display: 'inline'
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {mensagem.text}
                    </Text>

                )
            })
            }

        </Box>
    )
}