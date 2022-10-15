function GlobalStyle() {
    return (
        <style global jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
          font-family: 'Roboto';
        }
        body {
            overflow: 'overlay',
        }
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: rgba(90, 90, 90);
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.2);
          }

        /* ./App fit Height */ 
      `}</style>
    )
}


export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    )
}