import { useState } from "react";
import TicketCategoryComponent from "./TicketCategoryComponent";

function TicketWithPriceComponent({ onGetTickets }) {
  const [adultClicks, setAdultClicks] = useState(0);
  const [seniorClicks, setSeniorClicks] = useState(0);
  const [childClicks, setChildClicks] = useState(0);

  const adultPrice = 140;
  const seniorPrice = 120;
  const childPrice = 80;

  const totalPrice =
    adultClicks * adultPrice + seniorClicks * seniorPrice + childClicks * childPrice;

  const handleAddBtnClick = (category, setClicks) => {
    setClicks((clicks) => clicks + 1);
  };

  const handleMinusBtnClick = (category, setClicks) => {
    setClicks((clicks) => {
      if (clicks !== 0) {
        return clicks - 1;
      }
      return clicks;
    });
  };

  return (
    <div className="price-component">
      <TicketCategoryComponent
        label="Vuxen:"
        price={adultPrice}
        clicks={adultClicks}
        onAdd={() => handleAddBtnClick("adult", setAdultClicks)}
        onMinus={() => handleMinusBtnClick("adult", setAdultClicks)}
      />
      <TicketCategoryComponent
        label="Pensionär:"
        price={seniorPrice}
        clicks={seniorClicks}
        onAdd={() => handleAddBtnClick("pension", setSeniorClicks)}
        onMinus={() => handleMinusBtnClick("pension", setSeniorClicks)}
      />

      <TicketCategoryComponent
        label="Barn:"
        price={childPrice}
        clicks={childClicks}
        onAdd={() => handleAddBtnClick("child", setChildClicks)}
        onMinus={() => handleMinusBtnClick("child", setChildClicks)}
      />
      <hr className="white-line" />
      <p className="total-price">
        <span className="total-label">Total: </span>
        <span className="total-value">{totalPrice} kr</span>
      </p>
      <button
        className="btn login-btn"
        onClick={() => onGetTickets(adultClicks, seniorClicks, childClicks)}
      >
        Välj antal
      </button>
    </div>
  );
}

export default TicketWithPriceComponent;
