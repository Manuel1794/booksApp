import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

export const NavbarData = [
  {
    title: 'Inicio',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  }
  ,
  {
    title: 'Ajustes',
    path: '/ajustes',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'favs',
    path: '/favs',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  }
  // ,
  // {
  //   title: 'Title',
  //   path: '/edit-title',
  //   icon: <FaIcons.FaCartPlus />,
  //   cName: 'nav-text'
  // }
];
