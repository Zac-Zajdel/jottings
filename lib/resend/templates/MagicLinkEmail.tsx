import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Button,
  Heading,
  Html,
  Link,
  Preview,
  Text
} from '@react-email/components'

const baseUrl = process.env.NEXTAUTH_URL

export default function MagicLinkEmail({ url, host }) {
  return (
    <Html>
      <Head />
      <Preview>Jottings Login Link</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Your login request for Jottings</Heading>

          <Button
            style={button}
            href={url}
          >
            Login to Jottings
          </Button>

          <Text
            style={{
              ...text,
              color: '#ababab',
              marginTop: '14px',
              marginBottom: '16px'
            }}
          >
            If you didn&apos;t try to login, you can safely ignore this email.
          </Text>

          <Text style={footer}>
            ©2024 
            <Link
              href={`${baseUrl}`}
              target='_blank'
              style={{ ...link, color: '#898989' }}
            >
              Jottings
            </Link>
            <br />
            All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#ffffff'
}

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto'
}

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0'
}

const link = {
  color: '#2754C5',
  textDecoration: 'underline',
  paddingLeft: '4px',
  paddingRight: '4px'
}

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0'
}

const footer = {
  color: '#898989',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px'
}

const button = {
  backgroundColor: "#161618",
  borderRadius: "3px",
  fontWeight: "600",
  color: "#fff",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "11px 23px",
  fontFamily:
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
};
