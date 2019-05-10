import Typography from 'typography'
import funstonTheme from 'typography-theme-funston'

funstonTheme.bodyFontFamily =  ['Ubuntu', 'Noto Sans KR', 'sans-serif'];
// funstonTheme.headerFontFamily =  ['Source Code Pro', 'Nanum Gothic Coding'];

const typography = new Typography(
  funstonTheme
)

export default typography
