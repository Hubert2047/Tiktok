export const color = {
    BLACK: '#18191a',
    // BLACK: '#3a3b3c',#65676B
    WHITE: '#fff',
    GREY: '#f0f2f5',
    SECOND_GREY: '#b0b3b8',
    GREY_3: 'rgba(255, 255, 255, 0.1)',
    GREY_4: '#3a3b3c',
    GREY_5: '#65676B',
    PRIMARY_TEXT: ' #E4E6EB',
}
const BORDER = '--border-theme'
const BORDER_2 = '--border-theme-2'
const BACKGROUND = '--bg-theme'
const BACKGROUND_2 = '--bg-theme-2'
const TEXT = '--text-theme'
const ICON = '--icon-theme'
const HOVER = '--hover-theme'

// export const styleThemes = {
//     black: { border: color.BLACK, lightTheme: color.WHITE, boderColor: '' },
//     white: { darkTheme: color.WHITE, lightTheme: color.BLACK, boderColor: '' },
// }
export const styleThemes = {
    dark: [
        {
            property: BORDER,
            value: color.GREY_3, //grey
        },
        {
            property: BORDER_2,
            value: color.GREY_3, //grey
        },
        {
            property: BACKGROUND,
            value: color.BLACK,
        },
        {
            property: BACKGROUND_2,
            value: color.GREY_4,
        },
        {
            property: TEXT,
            value: color.PRIMARY_TEXT,
        },
        {
            property: ICON,
            value: color.SECOND_GREY,
        },
        {
            property: HOVER,
            value: color.GREY_4,
        },
    ],
    light: [
        {
            property: BORDER,
            value: color.GREY, //grey
        },
        {
            property: BACKGROUND,
            value: color.WHITE,
        },
        {
            property: BACKGROUND_2,
            value: color.GREY,
        },
        {
            property: TEXT,
            value: color.DARK,
        },
        {
            property: ICON,
            value: color.GREY_5,
        },
        {
            property: HOVER,
            value: color.GREY,
        },
    ],
}
