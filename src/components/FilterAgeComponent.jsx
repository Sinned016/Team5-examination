export default function FilterAge({ children, juniors, adults }) {
  const child = "0-7";
  const junior = "7-11";
  const adult = "15";
  function handleAgeRestriction(event) {}

  return (
    <div className="ageFilter">
      <label htmlFor=""> Ålder </label>
    </div>
  );
}
