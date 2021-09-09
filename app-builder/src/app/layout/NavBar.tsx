import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Image, Menu } from 'semantic-ui-react';

export default function NavBar(){

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header >
                    <Image circular size='mini' src='/assets/logo.png' />
                    Form Builder
                </Menu.Item>
                <Menu.Item as={NavLink} to='/forms' name='Forms' />
                <Menu.Item>
                    <Button as={NavLink} to='/createForm' positive content='Create Form'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}