import Accordion from "react-bootstrap/Accordion";

function Faq() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="accordion-header">
          What is the warranty period for electronics?
        </Accordion.Header>
        <Accordion.Body className="accordion-body">
          The warranty period varies by product and brand, typically ranging
          from 1 to 3 years. Please check the specific product details for
          warranty information.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          What is your return policy for electronics?
        </Accordion.Header>
        <Accordion.Body>
          Our return policy allows returns within 30 days of purchase for
          unopened items. Opened items may be returned within 15 days for
          exchange or store credit, subject to inspection.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>What payment methods do you accept?</Accordion.Header>
        <Accordion.Body>
          We accept various payment methods, including major credit/debit cards,
          PayPal, and bank transfers. You can choose your preferred method at
          checkout.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>How can I track my order?</Accordion.Header>
        <Accordion.Body>
          You can track your order using the tracking link provided in your
          order confirmation email. Alternatively, log in to your account on our
          website to view your order status.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Faq;
