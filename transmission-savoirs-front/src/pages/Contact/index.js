import Page from '../../components/Page';
import Container from '../../components/Container';
import ContactForm from './ContactForm';

function Contact() {
  return (
    <Page>
      <Container>
        <section className="section">
          <header className="section__header">
            <h1 className="section__title">Nous contacter</h1>
            <p className="section__subtitle">
              Pour toute question vous pouvez nous envoyer un e-mail à <a href="mailto:contact@saevoir.fr" className="link">contact@saevoir.fr</a> ou nous contacter via le formulaire ci-dessous.
            </p>
          </header>
        </section>
        <ContactForm />
      </Container>
    </Page>
  );
}

export default Contact;
