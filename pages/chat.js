import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { ButtonSendSticker} from '../src/components/SendSticker'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5raWF6ZHN0a29scWp2eWVyb3FnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2NTg1ODgwNywiZXhwIjoxOTgxNDM0ODA3fQ.fpIjLrEE7_OYSMZHifhZ6dlzMpVv8pfs4PZbFWgGmmU'
const supabaseUrl = 'https://nkiazdstkolqjvyeroqg.supabase.co';
const supabaseClient = createClient(supabaseUrl, SUPABASE_ANON_KEY);

// function realTimeMessage(adicionaMensagem){
//     return supabaseClient
//     .from('mensagens')
//     .on('INSERT', ({respostaLive}) => {
//         adicionaMensagem(respostaLive.new);
//     }).subscribe();
// }
function realTimeMessage(adicionaMensagem) {
    return supabaseClient
      .from('mensagens')
      .on('INSERT', (respostaLive) => {
        adicionaMensagem(respostaLive.new);
      })
      .subscribe();
  }

export default function ChatPage() {
    const roteamento = useRouter();
    const userLogado = roteamento.query.username
    const [message, setMessage] = React.useState('');
    const [listMessage, setlistMessage] = React.useState([])

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
        .select('*')
        .order('id', {ascending: false})
        .then(({data})=> {
            console.log('Dados da consulta', data);
            setlistMessage(data);
        });
        // inicio da const

        const subscription = realTimeMessage((novaMensagem) => {
            console.log('Nova mensagem:', novaMensagem);
            console.log('listaDeMensagens:', listMessage);
            // Quero reusar um valor de referencia (objeto/array) 
            // Passar uma função pro setState
     
            // setListaDeMensagens([
            //     novaMensagem,
            //     ...listaDeMensagens
            // ])
            setlistMessage((valorAtualDaLista) => {
              console.log('valorAtualDaLista:', valorAtualDaLista);
              return [
                novaMensagem,
                ...valorAtualDaLista,
              ]
            });
          });
     
          return () => {
            subscription.unsubscribe();
          }
//final da const
    }, []);

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            
            from: userLogado,
            text: novaMensagem,
        };
        supabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(({data}) => {
                console.log('Criando mensagem: ', data)
                // setlistMessage([
                //     mensagem,
                // //     ...listMessage,
        
                // ]);

           })


        
        setMessage('');
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
                            <ButtonSendSticker
                                onStickerClick = {(sticker) => {
                                    handleNovaMensagem(':sticker:'+sticker)
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
                    <h2>Chat</h2>
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
                            marginBottom: '16px',
                            marginRight: '5px',
                            backgroundColor: appConfig.theme.colors.neutrals[500],
                            backgroundColor: appConfig.theme.colors.neutrals[700],
                            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                            
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
                        {mensagem.text.startsWith(':sticker:') ? 
                        (
                            <Image src={mensagem.text.replace(':sticker:', '')} styleSheet={{
                                maxWidth: '100px'
                            }}/>
                        ): 
                        (
                            <p>{mensagem.text}</p>
                        )}
                        
                    </Text>

                )
            })
            }

        </Box>
    )
}