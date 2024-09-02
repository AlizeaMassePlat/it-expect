// import : scss variables
import variables from '../../styles/variables.module.scss';

/**
 * Create a logo component with the right color
 * @returns Logo with primary-color
 */
function LogoutIcon() {
  const { redColor } = variables;
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className="logout-icon" d="M4.975 21.475q-1.1 0-1.875-.763-.775-.762-.775-1.887V5.175q0-1.125.775-1.888.775-.762 1.875-.762h7.15v2.65h-7.15v13.65h7.15v2.65Zm11.05-3.8-1.85-1.875 2.475-2.475h-7.9v-2.65h7.9L14.175 8.2l1.85-1.875L21.675 12Z" fill={redColor} />
    </svg>
  );
}

export default LogoutIcon;
