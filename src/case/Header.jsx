import icon from "../assets/pictures.svg";
export default function Header () {
  return (
    <header className='header'>
      <img className="header__icon" alt="icon" src={icon}/>
    </header>
  )
}