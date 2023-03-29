import React from 'react';
import PropTypes from 'prop-types';
import { TransitionPortal } from 'gatsby-plugin-transition-link';
import { LayoutWrapper, LayoutMain } from './style';
import GlobalStyle from '../../styles/global';
import Sidebar from '../Sidebar/index';
import MenuBar from '../MenuBar/index';
console.log(console.log('%c  欢迎您访问我的Blog！','font-size:50px;color:#AE4C9D;-webkit-text-fill-color:#AE4C9D;-webkit-text-stroke: 1px black;'))
const Layout = ({ children }) => { 
  return (
    <LayoutWrapper>
      <GlobalStyle />
      <TransitionPortal level="top">
        <Sidebar />
      </TransitionPortal>
      <LayoutMain>{children}</LayoutMain>
      <TransitionPortal level="top">
        <MenuBar />
      </TransitionPortal>
    </LayoutWrapper>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
