import PropTypes from 'prop-types';

const Header = ({ toggleDarkMode, darkMode }) => {
  return (
    <header>
      <h1>Action-List</h1>
      <div className="dark-mode-toggle">
      <h3 style={{margin:"5px"}}>Dark Mode</h3>
        <label>
          <input
            type="checkbox"
            onChange={toggleDarkMode}
            checked={darkMode}
          />
          <span className="slider"></span>
        </label>
      </div>
    </header>
  );
};

Header.propTypes = {
  toggleDarkMode: PropTypes.func.isRequired,
  darkMode:PropTypes.func.isRequired
};

export default Header;
