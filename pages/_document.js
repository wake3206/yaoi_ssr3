import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
      <html>
        <Head>
          
          <link rel='stylesheet' href='/static/css/bootstrap.min.css' />
          <link rel='stylesheet' href='/static/css/style.css' />
          <link rel='stylesheet' href='/static/slick/slick.css' />
          <link rel='stylesheet' href='/static/slick/slick-theme.css' />
          <link rel='stylesheet' href='/static/css/react-draft-wysiwyg/dist/react-draft-wysiwyg.css' />
          <link rel='stylesheet' href='/static/css/nprogress.css' />

         
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
