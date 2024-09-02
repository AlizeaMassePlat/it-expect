import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Panel from '../../components/Panel';
import Input from '../../components/Input';

import './style.scss';
import { sendMessage, changeValue, initInfo } from '../../actions';
import Error from '../../components/Error';
import useInitError from '../../hooks/useInitError';

function ContactForm() {
  useInitError();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initInfo());
  }, []);

  const handleChange = (event) => dispatch(changeValue(event.target.value, 'message'));

  const isError = useSelector((state) => state.user.error);
  const errorMsg = useSelector((state) => state.user.errorMsg);
  const info = useSelector((state) => state.user.info);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(sendMessage());
  };

  return (
    <Panel>
      {info.isDisplayed && (
        <>
          <p className="info">{info.msg}</p>
          <Link to="/">
            <Button label="Retourner à l'accueil" />
          </Link>
        </>
      )}
      {!info.isDisplayed
      && (
        <form className="form" onSubmit={handleSubmit} id="formulaire">
          {isError && <Error msg={errorMsg} />}
          <div className="form__field">
            <label htmlFor="email">Adresse email&nbsp;*</label>
            <Input
              name="email"
              type="email"
              required
              placeholder="Votre adresse email..."
              aria-label="Saisissez votre email"
              id="email"
            />
          </div>
          <div className="form__field">
            <label htmlFor="email">Votre nom&nbsp;*</label>
            <Input
              name="fullname"
              type="text"
              required
              placeholder="Votre nom..."
              aria-label="Saisissez votre nom"
              id="fullname"
            />
          </div>
          <div className="form__field">
            <label htmlFor="email">Votre message&nbsp;*</label>
            <textarea
              name="message"
              required
              placeholder="Votre message..."
              aria-label="Saisissez votre message"
              id="message"
              rows="5"
              onChange={handleChange}
            />
          </div>
          <Button isSubmit label="Envoyer le message" tabIndex={0} />
        </form>
      )}
    </Panel>
  );
}

export default ContactForm;
