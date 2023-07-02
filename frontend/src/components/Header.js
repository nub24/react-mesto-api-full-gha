import { Link, useLocation } from 'react-router-dom';

function Header({ loggedEmail, onSignOut}) {
  const location = useLocation()

  return (
    <header className="header">
      <div className="header__logo"></div>
      {location.pathname === '/' 
        && <div className='header__info'>{loggedEmail} 
        <Link className='header__link' onClick={onSignOut} to='/sign-in'>Выйти</Link></div>}
      {location.pathname === '/sign-in' 
        && <span className='header__info'><Link className='header__link' to='/sign-up'>Регистрация</Link></span>}
      {location.pathname === '/sign-up' 
        && <span className='header__info'><Link className='header__link' to='/sign-in'>Вход</Link></span>}
      
    </header>
  );
}

export default Header;
