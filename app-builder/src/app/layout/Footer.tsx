import React from "react";
import { Link } from "react-router-dom";
import { Container, Message, Segment } from "semantic-ui-react";

function Footer() {
  return (
    <Container className='fixed bottom'>
      <Segment size='mini' fixed="bottom">
          <Message>Designed & Developed By <Link to=''>www.zaheerulhassan.com</Link> </Message>
      </Segment>
    </Container>
  );
}

export default Footer;
