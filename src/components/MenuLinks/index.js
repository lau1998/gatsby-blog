import React from 'react';
import links from './content';
import getThemeColor from '../../utils/getThemeColor';

import {
  MenuLinksWrapper,
  MenuLinksList,
  MenuLinksItem,
  MenuLinksLink
} from './style';

const MenuLinks = () => (
  <MenuLinksWrapper>
    <MenuLinksList>
      {links.map((link, index) => {
        return (
          <MenuLinksItem key={index}>
            <MenuLinksLink
              cover
              direction="right"
              bg={getThemeColor()}
              duration={0.6}
              to={link.url}
              activeClassName="active"
            >
              {link.label}
            </MenuLinksLink>
          </MenuLinksItem>
        );
      })}
    </MenuLinksList>
  </MenuLinksWrapper>
);

export default MenuLinks;
