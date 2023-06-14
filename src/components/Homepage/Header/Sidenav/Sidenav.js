import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHouse, faMagnifyingGlass, faCog, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PetsContext } from '../../../../contexts/PetsContext';

import './Sidenav.css';

export default function Sidenav() {
  const [showSidenav, setShowSidenav] = React.useState(false);
  const { login } = useContext(PetsContext);
  const { role } = useContext(PetsContext);
  const toggleSidenav = () => setShowSidenav(!showSidenav);

  return (
    <div>
      <FontAwesomeIcon
        icon={faBars}
        className="sidenav_icon text-white"
        onClick={toggleSidenav}
      />
      <Offcanvas
        backdrop={true}
        id="offcanvas"
        className="sidenav"
        show={showSidenav}
        onHide={() => setShowSidenav(false)}
      >
        <Offcanvas.Body>
          <div className="sidenav_item">
            <Link to="/" onClick={() => setShowSidenav(false)}>
              <FontAwesomeIcon
                icon={faHouse}
                className="home_icon title"
                title="Home"
              />
            </Link>
            <Link to="/search" onClick={() => setShowSidenav(false)}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="search_icon title"
                title="Search"
              />
            </Link>
            <div className="sidenav_item_login">
            {login && (
                <Link to="/profile-settings" onClick={() => setShowSidenav(false)}>
                  <FontAwesomeIcon
                    icon={faCog}
                    className="settings_icon title"
                    title="Settings"
                  />
                </Link>
            )}
            {login && role === 'admin' && (
              <Link to="/admin/dashboard" onClick={() => setShowSidenav(false)}>
                <FontAwesomeIcon
                  icon={faUserTie}
                  className="admin_icon title"
                  title="Admin"
                />
              </Link>
            )}
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

