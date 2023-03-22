import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineCar,
} from 'react-icons/ai';
import { BiSupport } from 'react-icons/bi';
import HttpsOutlinedIcon from '@material-ui/icons/HttpsOutlined';
import Forward30OutlinedIcon from '@material-ui/icons/Forward30Outlined';

export const secShippings = [
  {
    icon: <AiOutlineCar />,
    title: 'FREE SHIPPING',
    content: 'Free shipping on all US order or order above $100',
  },
  {
    icon: <BiSupport />,
    title: 'SUPPORT 24/7',
    content: 'Contact us 24 hours a day, 7 days a week',
  },
  {
    icon: <Forward30OutlinedIcon />,
    title: '30 DAYS RETURN',
    content: 'Simply return it within 30 days for an exchange.',
  },
  {
    icon: <HttpsOutlinedIcon />,
    title: '100% PAYMENT SECURE',
    content: 'We ensure secure payment with PEV',
  },
];

export const footers = [
  {
    menu: 'Categories',
    items: [
      { name: 'Men', link: '#' },
      { name: 'Women', link: '#' },
      { name: 'Accessories', link: '#' },
      { name: 'Shoes', link: '#' },
      { name: 'Denim', link: '#' },
      { name: 'Dress', link: '#' },
    ],
  },
  {
    menu: 'Infomation',
    items: [
      { name: 'About Us', link: '#' },
      { name: 'Contact Us', link: '#' },
      { name: 'Terms & Conditions', link: '#' },
      { name: 'Returns & Exchanges', link: '#' },
      { name: 'Shipping & Delivery', link: '#' },
      { name: 'Privacy Policy', link: '#' },
    ],
  },
  {
    menu: 'Useful links',
    items: [
      { name: 'Store Location', link: '#' },
      { name: 'Latest News', link: '#' },
      { name: 'My Account', link: '#' },
      { name: 'Size Guide', link: '#' },
      { name: 'FAQs 2', link: '#' },
      { name: 'FAQs', link: '#' },
    ],
  },
];

export const icons = [
  { icon: <FaFacebookF />, text: 'Follow on Facebook', name: 'facebook' },
  { icon: <FaLinkedinIn />, text: 'Follow on Linkedin', name: 'linkedin' },

  { icon: <AiOutlineTwitter />, text: 'Follow on Twitter', name: 'twitter' },
  {
    icon: <AiOutlineInstagram />,
    text: 'Follow on Instagram',
    name: 'instagram',
  },
  { icon: <FaPinterestP />, text: 'Follow on Pinterest', name: 'pinterest' },
];
export const sortMini = [
  { name: 'Price, Low To High', data: 'lowest' },
  { name: 'Price, High To Low', data: 'highest' },
  { name: 'Alphabetically, Z-A', data: 'Z-A' },
  { name: 'Alphabetically, A-Z', data: 'A-Z' },
];
