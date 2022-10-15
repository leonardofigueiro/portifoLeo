import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';

function Title(props) {
  return (
    <>
      <h1>{props.children}</h1>
    </>
  )
}

// function HomePage() {
//     return (
//         <div>
//             <GlobalStyle />
//             <Title>Boas vindas de volta!</Title>
//             <h4>Aluracord - Alura Matrix</h4>

//         </div>
//     )
// }

// export default HomePage

export default function PaginaInicial() {
  //const username = 'leonardofigueiro';
  const [username, setUsername] = React.useState('');
  const roteamento = useRouter();

  return (
    <>

      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/07/staredad-1536x864.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box styleSheet={{
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          width: '100%', maxWidth: '700px', height: 'auto',
          borderRadius: '5px', padding: '32px', margin: '16px',
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          backgroundColor: appConfig.theme.colors.neutrals[700],

        }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },

            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={function (infoEvent) {
                infoEvent.preventDefault();
                roteamento.push('/chat');
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Title>Bem vindo ao meu PortifoLéo!</Title>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.name}
              </Text>

              <TextField
                value={username}
                placeholder='Digite seu usuário GitHub.'
                fullWidth
                onChange={function valid(a) {
                  if (a.target.value.length > 2) {
                    const valor = a.target.value;
                    setUsername(valor);
                  } else {
                    setUsername();
                  }

                }}
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary['050'],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
              />
              <Button
                type='submit'
                disabled={!username}
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
            {/* Formulário */}


            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={`https://github.com/${username}.png`}


              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            </Box>
            {/* Photo Area */}






          </Box>







        </Box>
      </Box>

    </>
  );
}