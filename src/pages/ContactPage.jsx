import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControl, FormGroup, FormLabel, FormText } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";

export default function ContactPage() {
  return (
    <div className="container-xl">
      <div className="row">
        <div className="col-md-6 col-lg-6 col-xl-7 col-xxl-8">
          <div className="contact-text m-2">
            <h1>Kontakta oss</h1>
            <p>
              Har du några frågor om din bokning?
              <br />
              Eller har du andra funderingar om Filmvisarnas biograf?
            </p>
            <p />
            Ring oss på telefonnummer:
            <br />
            <FontAwesomeIcon icon={faPhone} /> 020-123456
            <p>eller skriv din fråga i formuläret.</p>
          </div>
        </div>
        <div className="col-md-6 col-lg-6 col-xl-5 col-xxl-4">
          <Form className="contact-form d-flex row mt-2 justify-content-center">
            <FormGroup className="mb-3" controlId="formName">
              <FormLabel>Namn</FormLabel>
              <FormControl placeholder="Skriv ditt namn här" />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formEmail">
              <FormLabel>E-post</FormLabel>
              <FormControl type="email" placeholder="namn@exempel.com" />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formTextField">
              <FormLabel>Meddelande</FormLabel>
              <FormControl
                as="textarea"
                rows={3}
                placeholder="Ställ din fråga här"
              />
            </FormGroup>
            <Button
              className="send-form-btn mb-4"
              type="submit"
              onClick={() =>
                alert(
                  "Denna funktion fungerar tyvärr inte. Var vänlig ring 020-123456 istället. Tack!"
                )
              }>
              Skicka
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
