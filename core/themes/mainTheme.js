const theme = {
  font: 'Arial, "Roboto", "Helvetica Neue", sans-serif',
  fonts: {
    fontSans: '"Open Sans", Tahoma, Verdana, Arial, sans-serif',
    fontSerif: 'Georgia, Times, "Times New Roman", serif',
    fontCondensed: '"Open Sans Condensed", Tahoma, Verdana, Arial, sans-serif',
    fontIp: '"ip", sans-serif',
    fontTitle: 'Cuprum, serif',
    fontText: 'Alegreya Sans, sans-serif'
  },
  icons: {
    location: '\\e804',
    mail: '\\e802',
    envelope: '\\e803',
    phone: '\\e800',
    mobile: '\\e801',
    instagram: '\\e805',
    fb: '\\e806',
    facebook: '\\e806',
    vk: '\\e807',
    vkontakte: '\\e807',
    youtube: '\\e80a',
    telegram: '\\e808',
    telegram2: '\\e809',
    youtube_play: '\\e80b',
    whatsapp: '\\e80c',
    play: '\\e80d',
    play2: '\\e80e',
    arrow_left: '\\e810',
    arrow_right: '\\e811',
    arrow_top: '\\e812',
    spinner: '\\e813',
    search: '\\e80f',
  },
  images: {},
  colors: {},
  extra: {},
  colors: {
    // Color variables
    brandColor: '#073F80FF',
    colorLight: '#f3f6f6',
    colorDarken: '#bdc3c7',
    colorDark: '#2c3e50',
    colorAccent: '#FFA726',
    colorBlack: '#000000',
    bgColor: '#fff',
    grey: '#696969'
  },
  images: {
  },
}

const themeExtra = {
  ...theme,
  extra: {
    boxShadow: `0 1px 2px -1px ${theme.colors.colorDark}`
  }
}

export default themeExtra
