import "./TicketCategoryComponent.css";
export default function TicketCategoryComponent({ label, price, clicks, onAdd, onMinus }) {
  return (
    <p className="ticket-category">
      <label>{label}</label>
      <div>
        <button onClick={onMinus}>-</button>
        <span>{clicks}</span>
        <button onClick={onAdd}>+</button>
      </div>
      <label> {price} kr</label>
    </p>
  );
}
