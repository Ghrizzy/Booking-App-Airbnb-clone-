import PhotoUploader from "../PhotoUploader";
import Perks from "../Perks";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [perks, setPerks] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState(100);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuest(data.maxGuest);
      setPrice(data.price);
    });
  }, [id]);

  //grouping the classname for the header h2 tags on the form
  function inputHeader(text) {
    return <h2 className="text-xl mt-4">{text}</h2>;
  }

  //grouping the classname for the p tags on the form
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  //grouping the classname for the h2 tags and the p tag together on the form
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  //function to add a new place

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
      price,
    };
    if (id) {
      //update place
      await axios.put("/places", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      //create new place
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput("Title", "Title for your place. should be short and catchy")}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example: my lovely apt"
        />
        {preInput("Address", "Address to this place")}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="address"
        />
        {preInput("Photos", "more = better")}

        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description", "Description of the place")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {preInput("Perks", "Select all the perks of your place")}

        <div className=" mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput("Extra Info", "House rules, etc")}

        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        {preInput("Check in & out times", "Add check in and check out time")}
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="12:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="11:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guest</h3>
            <input
              type="text"
              value={maxGuest}
              onChange={(ev) => setMaxGuest(ev.target.value)}
              placeholder="1"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price Per Night</h3>
            <input
              type="text"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
              placeholder="1"
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}
