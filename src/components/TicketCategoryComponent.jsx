import "./TicketCategoryComponent.css";
export default function TicketCategoryComponent({ label, price, clicks, onAdd, onMinus }) {
  return (
    <div className="ticket-category">
      <label>{label}</label>
      <div className="counter-container">
        <button onClick={onMinus}>-</button>
        <span>{clicks}</span>
        <button onClick={onAdd}>+</button>
      </div>
      <label> {price} kr</label>
    </div>
  );
}
