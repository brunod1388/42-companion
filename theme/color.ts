export const colors = {
  red: "#dd8070",
  red100: "#c75e4a",
  green: "#42acb3",
  green100: "#399399",
  violet: "#9ba9de",
  violet200: "#7687cb",
  black: "#000",
  white: "#fff",
  grey: "#c0c0c0",
  lightGrey: "#e8e8e8",
  grey42: "#252831",
  grey42dark: "#1c1e25",
  // green: {
  //   primary: palette.pineGreen,
  //   secondary: palette.darkCyan,
  //   accent: palette.midnightGreen,
  //   muted: palette.caribbeanCurrent,
  // },
  // blue: {
  //   primary: palette.royalBlueTraditional,
  //   secondary: palette.glaucous,
  //   accent: palette.silverLakeBlue,
  //   muted: palette.delftBlue,
  // },
  // red: {
  //   primary: palette.faluRed,
  //   secondary: palette.blackBean2,
  //   accent: palette.bloodRed,
  //   muted: palette.amaranthPurple,
  // },
  // dark: {
  //   background: palette.blacKbean,
  //   text: palette.white,
  // },
  // light: {
  //   background: palette.white,
  //   text: palette.blacKbean,
  // },
}

export type ColorsType = keyof typeof colors

export const palette = {
  tiffanyBlue: "#7DCDCCff",
  pineGreen: "#088579ff",
  darkCyan: "#118C81ff",
  midnightGreen: "#025457ff",
  caribbeanCurrent: "#005E5Dff",

  blacKbean: "#2b0001ff",
  faluRed: "#800011ff",
  blackBean2: "#490001ff",
  bloodRed: "#670003ff",
  amaranthPurple: "#ae1c45ff",

  skyBlue: "#96D2EBff",
  royalBlueTraditional: "#1D2E70ff",
  glaucous: "#5B84B7ff",
  silverLakeBlue: "#6591BFff",
  delftBlue: "#22357Aff",

  white: "#FFFFFFff",
  black: colors.grey42dark,

  // white: "#FFFFFFff",
  // black: "#000000ff",
}
