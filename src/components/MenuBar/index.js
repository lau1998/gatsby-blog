import React, { useState, useEffect } from "react";
import getThemeColor from "../../utils/getThemeColor";
import scrollToTop from "../../utils/scrollToTop";

import { SearchAlt2 as Search } from "@styled-icons/boxicons-regular";
import { CodeSSlash as Skills } from "@styled-icons/remix-fill";
// import { HomeHeart as Home } from "@styled-icons/boxicons-regular";
import { HomeSmile as Home } from "@styled-icons/remix-fill/HomeSmile";

import { LightBulb } from "@styled-icons/octicons";
import { Lightbulb } from "@styled-icons/fa-solid";
import { Person } from "@styled-icons/bootstrap/Person";
import { ArrowUpward as ArrowUp } from "@styled-icons/material";
import { Microphone as Talks } from "@styled-icons/heroicons-outline/Microphone";

import {
  MenuBarWrapper,
  MenuBarGroup,
  MenuBarLink,
  MenuBarItem,
} from "./style";

const MenuBar = () => {
  const [theme, setTheme] = useState(null);
  const [_, setDisplay] = useState(null);

  const isDarkMode = theme === "dark";

  useEffect(() => {
    setTheme(window.__theme);
    setDisplay(window.__display);

    window.__onThemeChange = () => setTheme(window.__theme);
    window.__onDisplayChange = () => setDisplay(window.__display);
  }, []);

  return (
    <MenuBarWrapper>
      <MenuBarGroup>
        <MenuBarLink
          cover
          direction="left"
          bg={getThemeColor()}
          duration={0.6}
          to="/"
          title="首页"
        >
          <MenuBarItem>
            <Home size={26} />
          </MenuBarItem>
        </MenuBarLink>
        <MenuBarLink
          cover
          direction="left"
          bg={getThemeColor()}
          duration={0.6}
          to="/talks"
          title="会谈和参与"
        >
          <MenuBarItem>
            <Talks size={26} />
          </MenuBarItem>
        </MenuBarLink>

        <MenuBarLink
          cover
          direction="left"
          bg={getThemeColor()}
          duration={0.6}
          to="/about/"
          title="关于我"
        >
          <MenuBarItem>
            <Person size={26} />
          </MenuBarItem>
        </MenuBarLink>

        <MenuBarLink
          cover
          direction="left"
          bg={getThemeColor()}
          duration={0.6}
          to="/skills/"
          title="技能"
        >
          <MenuBarItem>
            <Skills size={26} />
          </MenuBarItem>
        </MenuBarLink>
        {/* Search需要申请api，上线后再申请，暂时屏蔽，后续修复 */}
        {/* <MenuBarLink
          cover
          direction="left"
          bg={getThemeColor()}
          duration={0.6}
          to="/search/"
          title="搜索"
        >
          <MenuBarItem>
            <Search size={26} />
          </MenuBarItem>
        </MenuBarLink> */}
      </MenuBarGroup>

      <MenuBarGroup>
        <MenuBarItem
          title="更改主题"
          onClick={() => {
            window.__setPreferredTheme(isDarkMode ? "light" : "dark");
          }}
          className={theme}
        >
          {isDarkMode ? <LightBulb size={26} /> : <Lightbulb size={26} />}
        </MenuBarItem>

        <MenuBarItem title="回到顶部" onClick={scrollToTop}>
          <ArrowUp size={26} />
        </MenuBarItem>
      </MenuBarGroup>
    </MenuBarWrapper>
  );
};
export default MenuBar;
