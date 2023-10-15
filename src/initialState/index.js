import DashboardIcon from '@mui/icons-material/Dashboard';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import NetworkCheckOutlinedIcon from '@mui/icons-material/NetworkCheckOutlined';
import UpcomingOutlinedIcon from '@mui/icons-material/UpcomingOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import ModeStandbyOutlinedIcon from '@mui/icons-material/ModeStandbyOutlined';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';
import FeaturedVideoTwoToneIcon from '@mui/icons-material/FeaturedVideoTwoTone';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import FactCheckTwoToneIcon from '@mui/icons-material/FactCheckTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { lazy } from 'react';

const LandingPageAds = lazy(() => import("../Screens/Admin/Advertisement/LandingPageAds"));
const FeaturedAds = lazy(() => import("../Screens/Admin/Advertisement/FeaturedAds"));
const WhitelistAds = lazy(() => import("../Screens/Admin/Advertisement/WhitelistAds"));
const ProjectPageAds = lazy(() => import("../Screens/Admin/Advertisement/ProjectPageAds"));
const HeaderBanner = lazy(() => import("../Screens/Admin/Advertisement/HeaderBanner"));
const Dashboard = lazy(() => import("../Screens/Dashboard"));
const CategoryProject = lazy(() => import("../Screens/CategoryProject"));
const WhiteList = lazy(() => import("../Screens/WhiteList"));
const Projects = lazy(() => import("../Screens/Admin/Projects"));
const Category = lazy(() => import("../Screens/Admin/Category"));

export const menuList = [
  { link: '', component: <Dashboard />, label: 'Dashboard', brightImage: <DashboardIcon color={'#121212'} />, darkImage: <DashboardIcon color={'#ffffff'} /> },
  { link: 'featuredProject', component: <CategoryProject />, label: 'Featured Project', brightImage: <FeaturedPlayListIcon color={'#121212'} />, darkImage: <FeaturedPlayListIcon color={'#ededed'} /> },
  { link: 'hotProjectList', component: <CategoryProject />, label: 'Hot Project', brightImage: <LocalFireDepartmentOutlinedIcon color={'#121212'} />, darkImage: <LocalFireDepartmentOutlinedIcon color={'#ededed'} /> },
  {
    link: '', component: undefined, label: 'Networks', brightImage: <NetworkCheckOutlinedIcon color={'#121212'} />, darkImage: <NetworkCheckOutlinedIcon color={'#ededed'} />,
    submenu: [
      { link: 'networks/bsc', component: <CategoryProject />, label: 'BSC', brightImage: 'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717165/leoads/icons/info_black_momqfm.png' },
      { link: 'networks/fantom', component: <CategoryProject />, label: 'Fantom', brightImage: 'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717165/leoads/icons/info_black_momqfm.png' },
      { link: 'networks/avax', component: <CategoryProject />, label: 'Avax', brightImage: 'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717165/leoads/icons/info_black_momqfm.png' },
      { link: 'networks/polygon', component: <CategoryProject />, label: 'Polygon', brightImage: 'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717165/leoads/icons/info_black_momqfm.png' },
      { link: 'networks/ethereum', component: <CategoryProject />, label: 'Ethereum', brightImage: 'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717165/leoads/icons/info_black_momqfm.png' },
    ]
  },
  { link: 'upcomingProject', component: <CategoryProject />, label: 'Upcoming Project', brightImage: <UpcomingOutlinedIcon color={'#121212'} />, darkImage: <UpcomingOutlinedIcon color={'#ededed'} /> },
  { link: 'whitelists', component: <WhiteList />, label: 'Whitelists', brightImage: <EventNoteOutlinedIcon color={'#121212'} />, darkImage: <EventNoteOutlinedIcon color={'#ededed'} /> },
  { link: 'rugs', component: <CategoryProject />, label: 'Rugs', brightImage: <WarningOutlinedIcon color={'#121212'} />, darkImage: <WarningOutlinedIcon color={'#ededed'} /> },

  { link: 'deadProject', component: <CategoryProject />, label: 'Dead Project', brightImage: <ModeStandbyOutlinedIcon color={'#121212'} />, darkImage: <ModeStandbyOutlinedIcon color={'#ededed'} /> },
  { link: 'favorites', component: <CategoryProject />, label: 'Favorites', brightImage: <FavoriteIcon color={'#121212'} />, darkImage: <FavoriteIcon color={'#ededed'} /> }
]

export const adminMenu = [
  { link: '', component: <Projects />, label: 'Project management', brightImage: <ManageAccountsTwoToneIcon color={'#121212'} />, darkImage: <ManageAccountsTwoToneIcon color={'#ededed'} /> },

  { link: 'users', component: <Projects />, label: 'User management', brightImage: <BadgeTwoToneIcon color={'#121212'} />, darkImage: <BadgeTwoToneIcon color={'#ededed'} /> },
  { link: 'category', component: <Category />, label: 'Category management', brightImage: <CategoryTwoToneIcon color={'#121212'} />, darkImage: <CategoryTwoToneIcon color={'#ededed'} /> },
  {

    link: '', component: undefined, label: 'Advertisements', brightImage: <FeaturedVideoTwoToneIcon color={'#121212'} />, darkImage: <FeaturedVideoTwoToneIcon color={'#ededed'} />,
    submenu: [
      { link: 'advertisement/banner-header', component: <HeaderBanner />, label: 'Banner Header', brightImage: 'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655715914/leoads/2949475-200_rvbhp7.png' },
      { link: 'advertisement/landing-page', component: <LandingPageAds />, label: 'Landing Page', brightImage: 'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717646/leoads/icons/icon-landing-page-landing-page-landing-page-153083479_ip0im4.jpg' },
      { link: 'advertisement/featured', component: <FeaturedAds />, label: 'Featured Ads', brightImage: 'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655736761/leoads/icons/featured_label_new_favorite_star-512_djqgqa.webp' },
      { link: 'advertisement/whitelistAds', component: <WhitelistAds />, label: 'Whitelist Ads', brightImage: 'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655736916/leoads/icons/whitelist-permits-permission-512_pbyjwl.webp' },
      { link: 'advertisement/projectPageAds', component: <ProjectPageAds />, label: 'Project Ads', brightImage: 'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655736916/leoads/icons/whitelist-permits-permission-512_pbyjwl.webp' },
    ]
  },
  { link: 'whitelist', component: <Category />, label: 'Whitelist', brightImage: <FactCheckTwoToneIcon color={'#121212'} />, darkImage: <FactCheckTwoToneIcon color={'#ededed'} /> },

]

export const discord_icon = { data: 'M20.936 5.19c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.08.035c-.21.37-.443.85-.607 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23.077.077 0 0 0-.08-.038c-1.713.29-3.353.8-4.884 1.491a.07.07 0 0 0-.032.027C1.152 9.79.299 14.252.718 18.658a.08.08 0 0 0 .03.055 20.026 20.026 0 0 0 5.994 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.188 13.188 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.06 0a.075.075 0 0 1 .08.01c.12.097.245.194.372.287a.076.076 0 0 1 .02.1.076.076 0 0 1-.026.025c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.076.076 0 0 0 .084.028 19.962 19.962 0 0 0 6.002-2.98.075.075 0 0 0 .032-.055c.5-5.094-.838-9.52-3.55-13.442a.06.06 0 0 0-.03-.028ZM8.639 15.974c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38Zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38Z' };

export const telegram_icon = { data: 'M24.619 12.697c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12Zm-11.57-3.14c-1.167.484-3.5 1.49-6.998 3.013-.568.226-.866.447-.893.663-.046.366.412.51 1.034.705.085.027.173.054.263.084.613.2 1.437.432 1.865.441.389.008.823-.152 1.302-.48 3.268-2.207 4.955-3.322 5.06-3.346.076-.017.18-.039.25.024.07.062.063.18.056.212-.046.193-1.84 1.862-2.77 2.726-.29.27-.495.46-.537.504-.094.097-.19.19-.282.28-.57.547-.996.96.024 1.631.49.323.882.59 1.273.856.427.291.853.581 1.405.943.14.092.274.187.405.28.497.355.944.673 1.496.623.32-.03.652-.33.82-1.23.397-2.126 1.179-6.73 1.36-8.628a2.112 2.112 0 0 0-.02-.472.506.506 0 0 0-.172-.325c-.143-.117-.365-.142-.465-.14-.451.008-1.143.25-4.476 1.635Z' }

export const twitter_icon = { data: 'M24.262 5.634c-.835.37-1.732.62-2.675.733a4.67 4.67 0 0 0 2.048-2.578 9.299 9.299 0 0 1-2.958 1.13 4.66 4.66 0 0 0-7.938 4.25 13.23 13.23 0 0 1-9.602-4.868 4.66 4.66 0 0 0 1.442 6.22 4.647 4.647 0 0 1-2.11-.583v.06a4.66 4.66 0 0 0 3.737 4.568 4.692 4.692 0 0 1-2.104.08 4.661 4.661 0 0 0 4.352 3.234 9.348 9.348 0 0 1-5.786 1.995 9.5 9.5 0 0 1-1.112-.065 13.175 13.175 0 0 0 7.14 2.093c8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602a9.47 9.47 0 0 0 2.323-2.41l.002-.003Z' }

export const website_icon = { data: 'M512,380.121V38.788H0v341.333h186.182v46.545h-38.788v46.545h217.212v-46.545h-38.788v-46.545H512z  M46.545,333.576V85.333h418.909v248.242H46.545z' }

export const email_icon = { data: 'M 45 51.648 l 45 -27.845 v -6.422 c 0 -1.595 -1.293 -2.887 -2.887 -2.887 H 2.887 C 1.293 14.494 0 15.786 0 17.381 v 6.422 L 45 51.648 z M 45.789 54.688 c -0.011 0.007 -0.023 0.008 -0.033 0.015 c -0.08 0.047 -0.166 0.08 -0.253 0.111 c -0.04 0.014 -0.077 0.035 -0.118 0.046 c -0.115 0.031 -0.233 0.045 -0.353 0.048 c -0.011 0 -0.021 0.004 -0.031 0.004 c 0 0 -0.001 0 -0.001 0 s -0.001 0 -0.001 0 c -0.011 0 -0.021 -0.004 -0.031 -0.004 c -0.119 -0.003 -0.238 -0.018 -0.353 -0.048 c -0.04 -0.011 -0.078 -0.032 -0.118 -0.046 c -0.087 -0.031 -0.172 -0.064 -0.253 -0.111 c -0.011 -0.006 -0.023 -0.008 -0.033 -0.015 L 0 27.331 v 45.289 c 0 1.594 1.293 2.887 2.887 2.887 h 84.226 c 1.594 0 2.887 -1.293 2.887 -2.887 V 27.331 L 45.789 54.688 z' }

export const imoji_icon = [
  { color: '#ffc729', data: 'M440 160c29.5 0 53.3-26.3 53.3-58.7 0-25-31.7-75.5-46.2-97.3-3.6-5.3-10.7-5.3-14.2 0-14.5 21.8-46.2 72.3-46.2 97.3 0 32.4 23.8 58.7 53.3 58.7zM248 400c51.9 0 115.3-32.9 123.3-80 1.7-9.9-7.7-18.5-17.7-15.3-25.9 8.3-64.4 13.1-105.6 13.1s-79.6-4.8-105.6-13.1c-9.8-3.1-19.4 5.3-17.7 15.3 8 47.1 71.4 80 123.3 80zm130.3-168.3c3.6-1.1 6-4.5 5.7-8.3-3.3-42.1-32.2-71.4-56-71.4s-52.7 29.3-56 71.4c-.3 3.7 2.1 7.2 5.7 8.3 3.5 1.1 7.4-.5 9.3-3.7l9.5-17c7.7-13.7 19.2-21.6 31.5-21.6s23.8 7.9 31.5 21.6l9.5 17c2.1 3.6 6.2 4.6 9.3 3.7zm105.3-52.9c-24.6 15.7-46 12.9-46.4 12.9 6.9 20.2 10.8 41.8 10.8 64.3 0 110.3-89.7 200-200 200S48 366.3 48 256 137.7 56 248 56c39.8 0 76.8 11.8 108 31.9 1.7-9.5 6.3-24.1 17.2-45.7C336.4 20.6 293.7 8 248 8 111 8 0 119 0 256s111 248 248 248 248-111 248-248c0-27-4.4-52.9-12.4-77.2zM168 189.4c12.3 0 23.8 7.9 31.5 21.6l9.5 17c2.1 3.7 6.2 4.7 9.3 3.7 3.6-1.1 6-4.5 5.7-8.3-3.3-42.1-32.2-71.4-56-71.4s-52.7 29.3-56 71.4c-.3 3.7 2.1 7.2 5.7 8.3 3.5 1.1 7.4-.5 9.3-3.7l9.5-17c7.7-13.8 19.2-21.6 31.5-21.6z' },
  { color: '#ffa029', data: 'M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm105.6-151.4c-25.9 8.3-64.4 13.1-105.6 13.1s-79.6-4.8-105.6-13.1c-9.9-3.1-19.4 5.4-17.7 15.3 7.9 47.1 71.3 80 123.3 80s115.3-32.9 123.3-80c1.6-9.8-7.7-18.4-17.7-15.3zM168 240c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32z' },
  { color: '#ff6e29', data: 'M328 180c-25.69 0-55.88 16.92-59.86 42.12-1.75 11.22 11.5 18.24 19.83 10.84l9.55-8.48c14.81-13.19 46.16-13.19 60.97 0l9.55 8.48c8.48 7.43 21.56.25 19.83-10.84C383.88 196.92 353.69 180 328 180zm-160 60c17.67 0 32-14.33 32-32s-14.33-32-32-32-32 14.33-32 32 14.33 32 32 32zm185.55 64.64c-25.93 8.3-64.4 13.06-105.55 13.06s-79.62-4.75-105.55-13.06c-9.94-3.13-19.4 5.37-17.71 15.34C132.67 367.13 196.06 400 248 400s115.33-32.87 123.26-80.02c1.68-9.89-7.67-18.48-17.71-15.34zM248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm0 448c-110.28 0-200-89.72-200-200S137.72 56 248 56s200 89.72 200 200-89.72 200-200 200z' },
  { color: '#ff3d03', data: "M117.1 384.1c-25.8 3.7-84 13.7-100.9 30.6-21.9 21.9-21.5 57.9.9 80.3s58.3 22.8 80.3.9C114.3 479 124.3 420.8 128 395c.8-6.4-4.6-11.8-10.9-10.9zm-41.2-41.7C40.3 268 53 176.1 114.6 114.6 152.4 76.8 202.6 56 256 56c36.2 0 70.8 9.8 101.2 27.7 3.8-20.3 8-36.1 12-48.3C333.8 17.2 294.9 8 256 8 192.5 8 129.1 32.2 80.6 80.6c-74.1 74.1-91.3 183.4-52 274 12.2-4.1 27.7-8.3 47.3-12.2zm352.3-187.6c45 76.6 34.9 176.9-30.8 242.6-37.8 37.8-88 58.6-141.4 58.6-30.5 0-59.8-7-86.4-19.8-3.9 19.5-8 35-12.2 47.2 31.4 13.6 65 20.6 98.7 20.6 63.5 0 126.9-24.2 175.4-72.6 78.1-78.1 93.1-195.4 45.2-288.6-12.3 4-28.2 8.1-48.5 12zm-33.3-26.9c25.8-3.7 84-13.7 100.9-30.6 21.9-21.9 21.5-57.9-.9-80.3s-58.3-22.8-80.3-.9C397.7 33 387.7 91.2 384 117c-.8 6.4 4.6 11.8 10.9 10.9zm-187 108.3c-3-3-7.2-4.2-11.4-3.2L106 255.7c-5.7 1.4-9.5 6.7-9.1 12.6.5 5.8 5.1 10.5 10.9 11l52.3 4.8 4.8 52.3c.5 5.8 5.2 10.4 11 10.9h.9c5.5 0 10.3-3.7 11.7-9.1l22.6-90.5c1-4.2-.2-8.5-3.2-11.5zm39.7-25.1l90.5-22.6c5.7-1.4 9.5-6.7 9.1-12.6-.5-5.8-5.1-10.5-10.9-11l-52.3-4.8-4.8-52.3c-.5-5.8-5.2-10.4-11-10.9-5.6-.1-11.2 3.4-12.6 9.1L233 196.5c-1 4.1.2 8.4 3.2 11.4 5 5 11.3 3.2 11.4 3.2zm52 88.5c-29.1 29.1-59.7 52.9-83.9 65.4-9.2 4.8-10 17.5-1.7 23.4 38.9 27.7 107 6.2 143.7-30.6S416 253 388.3 214.1c-5.8-8.2-18.5-7.6-23.4 1.7-12.3 24.2-36.2 54.7-65.3 83.8z" }
]

export const category_buttons = [
  { title: 'All', state: true },
  { title: 'Tomb', state: false },
  { title: 'Olympus', state: false },
  { title: 'Node', state: false },
  { title: 'Univ', state: false },
  { title: 'Titano', state: false }
]

export const social_inks = [
  { title: 'Twitter', white_image: 'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717167/leoads/icons/twitter_white_mabfyp.png', black_image: 'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717167/leoads/icons/twitter_inactive_szpwhb.png', link: 'https://www.twitter.com' },
  { title: 'Discord', white_image: 'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717162/leoads/icons/discord_inactive_rhg0l7.png', black_image: 'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717162/leoads/icons/discord_black_lovbow.png', link: 'https://www.discord.com' },
  { title: 'Youtube', white_image: 'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717168/leoads/icons/youtube_white_mid5vn.png', black_image: 'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717168/leoads/icons/youtube_black_footer_u623q0.png', link: 'https://www.youtube.com' },
  { title: 'Telegram', white_image: 'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717167/leoads/icons/telegram_white_yxmbzs.png', black_image: 'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717167/leoads/icons/telegram_inactive_gqqzgo.png', link: 'https://www.telegram.com' },
  { title: 'Email', white_image: 'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717164/leoads/icons/email_white_footer_ykgbyk.png', black_image: 'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717164/leoads/icons/email_black_footer_i9d6ww.png', link: 'https://www.gmail.com' },
]

export const fearGreedBtn = [
  { title: 'TODAY', state: true },
  { title: 'YESTERDAY', state: false },
  { title: 'LAST WEEK', state: false },
  { title: 'LAST MONTH', state: false }
]

export const functionBtn = [
  { title: 'KYC', val: 0 },
  { title: 'Doxxed', val: 0 },
  { title: 'Liquidity Lock', val: 0 },
  { title: 'Multisign', val: 0 },
  { title: 'Audit', val: 0 },
  { title: 'Renounced', val: 0 },
  { title: 'No Mint Function', val: 0 },
  { title: 'Anti-rug', val: 0 },
  { title: 'Sustainability', val: 0 },
  { title: 'Staked or Sunk', val: 0 },
]

export const networkLabel = [
  { title: 'Ethereum', state: true },
  { title: 'BSC', state: false },
  { title: 'Polygon', state: false },
  { title: 'Avalanche', state: false }
]

export const chartCategoryBtn = [
  { title: '5M', state: true },
  { title: '1H', state: false },
  { title: '6H', state: false },
  { title: '24H', state: false }
]

export const functionality = [
  { title: 'KYC', state: true },
  { title: 'Audited', state: false },
  { title: 'Doxxed', state: false },
  { title: 'Renounced', state: false },
  { title: 'KYC', state: false },
  { title: 'Audited', state: false }
]

export const imoji_icon_1 = { data: 'M3.889 2.095a6.5 6.5 0 1 1 7.222 10.81A6.5 6.5 0 0 1 3.89 2.094zm.555 9.978A5.5 5.5 0 0 0 7.5 13 5.506 5.506 0 0 0 13 7.5a5.5 5.5 0 1 0-8.556 4.573zM10.294 4l.706.707-2.15 2.15a1.514 1.514 0 1 1-.707-.707L10.293 4zM7.221 7.916a.5.5 0 1 0 .556-.832.5.5 0 0 0-.556.832zm4.286-2.449l-.763.763c.166.403.253.834.255 1.27a3.463 3.463 0 0 1-.5 1.777l.735.735a4.477 4.477 0 0 0 .274-4.545h-.001zM8.733 4.242A3.373 3.373 0 0 0 7.5 4 3.5 3.5 0 0 0 4 7.5a3.46 3.46 0 0 0 .5 1.777l-.734.735A4.5 4.5 0 0 1 9.5 3.473l-.767.769z"' }

export const chart_data = {
  chainId: "",
  dexId: "",
  url: "https://dexscreener.com/bsc/0x7213a321f1855cf1779f42c0cd85d3d95291d34c",
  pairAddress: "0x7213a321F1855CF1779f42c0CD85d3D95291D34C",
  baseToken: {
    address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
    name: "Ethereum Token",
    symbol: "ETH"
  },
  quoteToken: {
    symbol: "BUSD"
  },
  priceNative: 0,
  priceUsd: 0,
  txns: {
    h24: {
      buys: 0,
      sells: 0
    },
    h6: {
      buys: 0,
      sells: 0
    },
    h1: {
      buys: 0,
      sells: 0
    },
    m5: {
      buys: 0,
      sells: 0
    }
  },
  volume: {
    h24: 0,
    h6: 0,
    h1: 0,
    m5: 0
  },
  priceChange: {
    h24: 0,
    h6: 0,
    h1: 0,
    m5: 0
  },
  liquidity: {
    usd: 0,
    base: 0,
    quote: 0
  },
  fdv: 0
}
