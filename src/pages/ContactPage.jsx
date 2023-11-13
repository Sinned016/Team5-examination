import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControl, FormGroup, FormLabel, FormText } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";

export default function ContactPage() {
    return (
        <div className="contactPage d-flex row m-2">
            <div className="contactText">
                <h1>Kontakta oss</h1>
                <p>Har du några frågor om din bokning? Eller har du andra funderingar om Filmvisarnas biograf.</p>
                <p />Ring oss på telefonnummer:
                    <br />
                    <a href="020123456" className="text-decoration-none"><FontAwesomeIcon icon={faPhone} />  020-123456</a>
                <p>eller skicka din fråga via formuläret nedan</p>
            </div>
            
            <Form className="contactForm d-flex row mt-2 justify-content-center">
                <FormGroup className="mb-3" controlId="formName">
                    <FormLabel>Namn</FormLabel>
                    <FormControl placeholder="Skriv ditt namn här" />
                </FormGroup>
                <FormGroup className="mb-3" controlId="formEmail">
                    <FormLabel>Email</FormLabel>
                    <FormControl type="email" placeholder="namn@exempel.com" />
                </FormGroup>
                <FormGroup className="mb-3" controlId="formTextField">
                    <FormLabel>Meddelande</FormLabel>
                    <FormControl as="textarea" rows={3} placeholder="Ställ din fråga här"/>
                </FormGroup>
                <Button className="sendFormBtn mb-4" type="submit">Skicka</Button>
            </Form>
        </div>
    )
}