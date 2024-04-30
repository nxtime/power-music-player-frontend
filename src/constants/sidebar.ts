import { homeIcon } from "$lib/icons/generic";
import type { SidebarList } from "../interfaces/sidebar";

export const NAVIGATION = [
  {
    name: "Home",
    title: "Your home page - Showing the latest musics",
    icon: homeIcon,
    url: "/"
  },
  // {
  //   name: "Explore",
  //   title: "Shows current trending musics, or the ones you haven't listened on for a while",
  //   url: "/explore"
  // },
  // {
  //   name: "Download",
  //   title: "Get new musics, via playlist url, or name",
  //   url: "/download"
  // }
];

export const TRACK_LIST: SidebarList[] = [
  // {
  //   name: "Playlists",
  //   title: "Shows playlists of all type of artists and albums",
  //   url: "/playlists",
  //   icon: `
  //     <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
  //       <path fill="currentColor" d="M28 64a12 12 0 0 1 12-12h176a12 12 0 0 1 0 24H40a12 12 0 0 1-12-12m12 76h116a12 12 0 0 0 0-24H40a12 12 0 0 0 0 24m68 40H40a12 12 0 0 0 0 24h68a12 12 0 0 0 0-24m143.49-52.55a12 12 0 0 1-14.94 8L212 128.13V192a36 36 0 1 1-24-33.94V112a12 12 0 0 1 15.45-11.49l40 12a12 12 0 0 1 8.04 14.94M188 192a12 12 0 1 0-12 12a12 12 0 0 0 12-12" />
  //     </svg>
  //   `,
  // },
  // {
  //   name: "Albums",
  //   title: "Shows albums of your favorite artists",
  //   url: "/albums",
  //   icon: `
  //     <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
  //       <path fill="currentColor" d="M12 16.5q1.875 0 3.188-1.312T16.5 12t-1.312-3.187T12 7.5T8.813 8.813T7.5 12t1.313 3.188T12 16.5m0-3.5q-.425 0-.712-.288T11 12t.288-.712T12 11t.713.288T13 12t-.288.713T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" />
  //     </svg>
  //   `
  // },
  // {
  //   name: "Artists",
  //   title: "Shows all your favorite artists",
  //   url: "/artists",
  //   icon: `
  //     <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
  //       <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12.9A5 5 0 1 0 11.098 9M15 12.9l-3.902-3.899l-7.513 8.584a2 2 0 1 0 2.827 2.83z" />
  //     </svg>
  //   `
  // }
];
