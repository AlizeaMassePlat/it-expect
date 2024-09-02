import PropTypes from 'prop-types';

import './style.scss';

function TeamMember({
  name, teamrole, desc, github, linkedin, avatar,
}) {
  return (
    <article className="team__member">
      <img className="team__member__avatar" src={`./images/avatars/${avatar}.png`} alt="Avatar" />
      <div className="team__member__infos">
        <h3 className="team__member__name">{name}</h3>
        <h4 className="team__member__role">{teamrole}</h4>
        <p className="team__member__desc">{desc}</p>
      </div>
      <ul className="team__member__socials">
        <li className="team__member__social__item">
          <a href={github} className="team__member__social__link" target="_blank" rel="noopener noreferrer">
            <img src="/images/icones/github.svg" alt="" /> <span>Github</span>
          </a>
        </li>
        <li className="team__member__social__item">
          <a href={linkedin} className="team__member__social__link" target="_blank" rel="noopener noreferrer">
            <img src="/images/icones/linkedin.svg" alt="" /> <span>Linkedin</span>
          </a>
        </li>
      </ul>
    </article>
  );
}

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  teamrole: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
  linkedin: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default TeamMember;
