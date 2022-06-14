import React from "react"
import ContentLoader from "react-content-loader"
import style from './skeleton.module.scss'


const Skeleton:React.FC = (props) => (
  <ContentLoader 
    className={style.skeleton}
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="150" cy="132" r="132" /> 
    <rect x="20" y="286" rx="11" ry="11" width="274" height="38" /> 
    <rect x="20" y="344" rx="10" ry="10" width="280" height="88" /> 
    <rect x="20" y="449" rx="11" ry="11" width="95" height="30" /> 
    <rect x="130" y="443" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
)

export default Skeleton