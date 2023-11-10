function MapPage() {
  const mapSrc = "https://maps.google.com/maps?q=Stock%20Holm&t=&z=15&ie=UTF8&iwloc=&output=embed";
  return (
    <>
      <div className="d-flex justify-content-center mt-3">
        <iframe
          src={mapSrc}
          width="900"
          height="500"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <p className="text-center mt-5 mb-5">Besöksadress: Gustav Adolfs torg 2, 111 52 Stockholm</p>
    </>
  );
}
export default MapPage;
