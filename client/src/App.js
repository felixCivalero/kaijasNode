import "./App.css";
import { useState } from "react";
import Axios from "axios";
import React from "react";
import { ReactComponent as Logo } from "./assets/logga.svg";
import { ReactComponent as Kaija } from "./assets/kaija.svg";
import { ReactComponent as Salong } from "./assets/storgatan-44.svg";
import { ReactComponent as Stage } from "./assets/Kaijas-scen-01.svg";

function App() {
  ////ARTISTS LOGIN INFO
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPwd, setLoginPwd] = useState("");

  ///////////CONCERT UPLOAD
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [desc, setDesc] = useState("");

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  ////// CONCERT DISPLAY
  const [artistsList, setArtistsList] = useState([]);

  ////////BOOKING CONCERT

  const [bookingName, setBookingName] = useState("");
  const [bookingMail, setBookingMail] = useState("");
  const [bookingTel, setBookingTel] = useState("");
  const [bookingEat, setBookingEat] = useState("");
  const [bookingAmount, setBookingAmount] = useState("");

  ////WAITING LIST
  const [waitingName, setWaitingName] = useState("");
  const [waitingMail, setWaitingMail] = useState("");
  const [waitingPhone, setWaitingPhone] = useState("");
  const [waitingAmount, setWaitingAmount] = useState("");
  const [waitingEat, setWaitingEat] = useState("");

  ////////ARTIST REQUEST
  const [bandName, setBandName] = useState("");
  const [bandContact, setBandContact] = useState("");
  const [bandMail, setBandMail] = useState("");
  const [bandTel, setBandTel] = useState("");
  const [bandGenre, setBandGenre] = useState("");
  const [bandLink, setBandLink] = useState("");
  const [bandDesc, setBandDesc] = useState("");
  const [bandSocial, setBandSocial] = useState("");

  ////////COSTUMER SIGNUP
  const [costumerName, setCostumerName] = useState("");
  const [costumerMail, setCostumerMail] = useState("");
  const [costumerPhone, setCostumerPhone] = useState("");
  const [costumerInterest, setCostumerInterest] = useState("");

  const inputLoginUser = document.querySelector(".login__input--user");
  const inputLoginPin = document.querySelector(".login__input--pin");
  const welcome = document.querySelector(".welcome");
  const errorMsg = document.querySelector(".err__msg");
  const inputPopUp = document.querySelector(".input__pop--up");
  const artistNameInput = document.querySelector(".input__artist--name");
  const artistGenreInput = document.querySelector(".input__artist--genre");
  const artistPriceInput = document.querySelector(".input__artist--price");
  const artistDateInput = document.querySelector(".input__artist--date");
  const artistTimeInput = document.querySelector(".input__artist--time");
  const artistDescInput = document.querySelector(".input__artist--desc");
  const overlay = document.querySelector(".overlay");

  const bandNameInput = document.querySelector(".band__input--name");
  const bandContactInput = document.querySelector(".band__input--contact");
  const bandMailInput = document.querySelector(".band__input--mail");
  const bandTelInput = document.querySelector(".band__input--tel");
  const bandGenreInput = document.querySelector(".band__input--genre");
  const bandLinkInput = document.querySelector(".band__input--link");
  const bandDescInput = document.querySelector(".band__input--desc");
  const bandSocialInput = document.querySelector(".band__input--social");

  const costumerNameInput = document.querySelector(".costumer__input--name");
  const costumerMailInput = document.querySelector(".costumer__input--mail");
  const costumerTelInput = document.querySelector(".costumer__input--tel");
  const costumerInterestInput = document.querySelector(
    ".costumer__input--interest"
  );

  const waitingNameInput = document.querySelector(".waiting__input--name");
  const waitingAmountInput = document.querySelector(".waiting__input--amount");
  const waitingMailInput = document.querySelector(".waiting__input--mail");
  const waitingPhoneInput = document.querySelector(".waiting__input--phone");
  const waitingEatInput = document.querySelector(".waiting__input--eat");

  /*-------------LOG IN ARTIST--------------*/
  const getLoginInfo = () => {
    Axios.get("https://www.kaijasalong.com/api/getLoginInfo").then((response) => {
      const { email, band_PIN } = response.data[0];
      setLoginPwd(+band_PIN);
      setLoginEmail(email);
    });
  };

  function displayArtistInput(e) {
    e.preventDefault();
    if (pwd === loginPwd && user === loginEmail) {
      inputPopUp.classList.remove("hidden");
      overlay.classList.remove("hidden");
      inputLoginPin.value = "";
      inputLoginUser.value = "";
      setUser("-");
      setPwd("-");
      overlay.addEventListener("click", hideAndClearArtistInput);
    } else {
      errorMsg.classList.remove("hidden");
      welcome.classList.add("hidden");
      inputLoginPin.value = "";
      inputLoginUser.value = "";
      setUser("");
      setPwd("");

      setTimeout(() => {
        errorMsg.classList.add("hidden");
        welcome.classList.remove("hidden");
      }, 2000);
    }
  }

  const hideAndClearArtistInput = (e) => {
    inputPopUp.classList.add("hidden");
    overlay.classList.add("hidden");
    artistNameInput.value = "";
    artistGenreInput.value = "";
    artistPriceInput.value = "";
    artistDateInput.value = "";
    artistTimeInput.value = "";
    artistDescInput.value = "";
    setName("");
    setGenre("");
    setPrice("");
    setDate("");
    setTime("");
    setDesc("");
  };

  const hideAndClearBandInput = (e) => {
    const formDiv = document.querySelector(".band__form--div");
    const overlay = document.querySelector(".overlay");
    formDiv.classList.add("hidden");
    overlay.classList.add("hidden");
    bandContactInput.value = "";
    bandNameInput.value = "";
    bandMailInput.value = "";
    bandTelInput.value = "";
    bandGenreInput.value = "";
    bandLinkInput.value = "";
    bandSocialInput.value = "";
    bandDescInput.value = "";
    setBandName("");
    setBandContact("");
    setBandMail("");
    setBandTel("");
    setBandGenre("");
    setBandLink("");
    setBandSocial("");
    setBandDesc("");
  };

  /*---------------ADDING CONCERT TO DB-----------*/
  const addArtist = () => {
    Axios.post("https://www.kaijasalong.com/api/uploadArtist", {
      name: name,
      genre: genre,
      price: price,
      date: date,
      time: time,
      desc: desc,
    }).then(() => {
      alert('Din spelning ??r uppladad. G?? till "p?? scen" och se den :');
      hideAndClearArtistInput();
    });
  };

  /*---------------SET CONCERT FROM DB TO USESTATE-----------*/

  const getConcert = () => {
    Axios.get("https://www.kaijasalong.com/api/getConcert").then((response) => {
      setArtistsList(response.data);
    });
  };

  /*---------------ADDING BAND-REQUEST TO DB-----------*/

  const addBand = () => {
    Axios.post("https://www.kaijasalong.com/api/uploadBand", {
      bandName: bandName,
      bandContact: bandContact,
      bandMail: bandMail,
      bandTel: bandTel,
      bandGenre: bandGenre,
      bandLink: bandLink,
      bandSocial: bandSocial,
      bandDesc: bandDesc,
    }).then(() => {
      alert("Tack! Kika er mail f??r mer info! :)");
    });
  };

  /*---------------ADDING KAIJAS-FRIENDS TO DB-----------*/

  const addCostumer = () => {
    Axios.post("https://www.kaijasalong.com/api/uploadCostumer", {
      costumerName: costumerName,
      costumerMail: costumerMail,
      costumerPhone: costumerPhone,
      costumerInterest: costumerInterest,
    }).then(() => {
      alert(
        "Du ??r registrerad! H??ll utkik i inkorgen f??r sp??nnande nyheter :)"
      );
    });
  };

  const hideAndClearCostumerInput = (e) => {
    const formDiv = document.querySelector(".costumer__form--div");
    const overlay = document.querySelector(".overlay");
    formDiv.classList.add("hidden");
    overlay.classList.add("hidden");
    costumerNameInput.value = "";
    costumerMailInput.value = "";
    costumerTelInput.value = "";
    costumerInterestInput.value = "";
    setCostumerName("");
    setCostumerMail("");
    setCostumerPhone("");
    setCostumerInterest("");
  };

  /*---------------MENU BAR LOGICS-----------*/

  const tabsToggle = (e) => {
    const tabs = document.querySelectorAll(".op__tab");
    const tabsContent = document.querySelectorAll(".op__content");
    const clicked = e.target.closest(".op__tab");

    if (clicked.dataset.tab === "2") getConcert();

    if (!clicked) return;

    tabs.forEach((t) => t.classList.remove("op__tab--active"));
    tabsContent.forEach((c) => c.classList.remove("op__content--active"));

    clicked.classList.add("op__tab--active");

    document
      .querySelector(`.op__content--${clicked.dataset.tab}`)
      .classList.add("op__content--active");
  };

  /*---------------BOOKING-----------*/

  const revielBooking = (el, id) => {
    const bookingDiv = document.querySelector(`.booking__div--${id}`);
    const bookingInputFields = document.querySelectorAll(".booking__input");

    bookingDiv.classList.remove("hidden");
    overlay.classList.remove("hidden");

    const close = document.querySelector(`.artists__box--close--${id}`);
    const closeAndClear = () => {
      bookingDiv.classList.add("hidden");
      overlay.classList.add("hidden");
      bookingInputFields.forEach((e) => (e.value = ""));

      setBookingAmount("");
      setBookingName("");
      setBookingEat("");
      setBookingMail("");
      setBookingTel("");
    };

    close.addEventListener("click", function (e) {
      e.preventDefault();
      closeAndClear();
    });
    overlay.addEventListener("click", function (e) {
      e.preventDefault();
      closeAndClear();
    });
  };

  const fullyBooked = (el, id) => {
    const fullyBookedDiv = document.querySelector(`.fullyBooked__div--${id}`);

    fullyBookedDiv.classList.remove("hidden");
    overlay.classList.remove("hidden");

    const close = document.querySelector(`.fully_booked_box--close--${id}`);
    const closeAndClear = () => {
      fullyBookedDiv.classList.add("hidden");
      overlay.classList.add("hidden");
    };

    close.addEventListener("click", function (e) {
      e.preventDefault();
      closeAndClear();
    });
    overlay.addEventListener("click", function (e) {
      e.preventDefault();
      closeAndClear();
    });
  };

  const book = (val) => {
    Axios.post("https://www.kaijasalong.com/api/uploadBooking", {
      guestsName: bookingName,
      guestsMail: bookingMail,
      guestsTel: bookingTel,
      eat: bookingEat,
      amount: bookingAmount,
      bookingEventId: val.artists_id,
      bookingEventName: val.artists_name,
      bookingEventDate: val.artists_date,
      bookingEventTime: val.artists_time,
      totalPrice: val.artists_price * bookingAmount,
    }).then(() => {});
  };

  const waitingList = (val) => {
    const fullyBookedDiv = document.querySelector(
      `.fullyBooked__div--${val.artists_id}`
    );

    const closeAndClear = () => {
      fullyBookedDiv.classList.add("hidden");
      overlay.classList.add("hidden");
      waitingAmountInput.value = "";
      waitingEatInput.value = "";
      waitingNameInput.value = "";
      waitingMailInput.value = "";
      waitingPhoneInput.value = "";
      setWaitingAmount("");
      setWaitingEat("");
      setWaitingMail("");
      setWaitingPhone("");
      setWaitingName("");
    };
    Axios.post("https://www.kaijasalong.com/api/uploadWaiting", {
      waitingName: waitingName,
      waitingMail: waitingMail,
      waitingPhone: waitingPhone,
      waitingAmount: waitingAmount,
      waitingEat: waitingEat,
      waitingEventName: val.artists_name,
      waitingEventDate: val.artists_date,
      waitingEventTime: val.artists_time,
      waitingEventId: val.artists_id,
    }).then(() => {
      alert("Du ??r uppskriven!");
      closeAndClear();
    });
  };

  const updateConcert = (concertId, maxGuests) => {
    const bookingDiv = document.querySelector(`.booking__div--${concertId}`);
    const bookingInputFields = document.querySelectorAll(".booking__input");
    const closeAndClear = () => {
      bookingDiv.classList.add("hidden");
      overlay.classList.add("hidden");
      bookingInputFields.forEach((e) => (e.value = ""));

      setBookingAmount("");
      setBookingName("");
      setBookingEat("");
      setBookingMail("");
      setBookingTel("");
    };
    const updateCapacity = maxGuests - bookingAmount;
    Axios.post("https://www.kaijasalong.com/api/updateConcert", {
      id: concertId,
      capacity: updateCapacity,
    }).then(() => {
      alert("Du har bokat!");
      closeAndClear();
    });
  };

  return (
    <div className="App">
      <div className="header__logo">
        <Logo
          className="logo"
          onClick={(event) => (window.location.href = "/")}
        />
        <h2>
          <span aria-label="Sunflower" role="img">
            ????
          </span>{" "}
          Sommarst??ngt{" "}
          <span aria-label="Sunflower" role="img">
            ????
          </span>
        </h2>
        <h3>V??lkomna ??ter den 3e Augusti</h3>
        <p>
          H??ll utkik p?? v??r{" "}
          <a href="https://instagram.com/kaijasalong">instagram</a> eller bli{" "}
          <button
            className="closed__btn"
            onClick={(e) => {
              e.preventDefault();
              const formDiv = document.querySelector(".costumer__form--div");
              const overlay = document.querySelector(".overlay");
              formDiv.classList.remove("hidden");
              overlay.classList.remove("hidden");

              overlay.addEventListener("click", function (e) {
                e.preventDefault();
                overlay.classList.add("hidden");
                formDiv.classList.add("hidden");
              });
            }}
          >
            Kaijas-v??n
          </button>{" "}
          f??r att vara f??rst med v??ra nyheter!
        </p>
      </div>

      <div className="costumer__form--div hidden">
        <form className="costumer__form">
          <input
            className="costumer__input--name"
            type="text"
            name="costumerName"
            placeholder="F??r- & efternamn.."
            onChange={(event) => {
              setCostumerName(event.target.value);
            }}
          />
          <input
            className="costumer__input--mail"
            type="email"
            name="costumerMail"
            placeholder="Mail"
            onChange={(event) => {
              setCostumerMail(event.target.value);
            }}
          />
          <input
            className="costumer__input--tel"
            type="tel"
            name="costumerNumber"
            placeholder="Tel"
            onChange={(event) => {
              setCostumerPhone(event.target.value);
            }}
          />
          <textarea
            className="costumer__input--interest"
            type="text"
            name="costumerGenre"
            placeholder="Intresserad av"
            onChange={(event) => {
              setCostumerInterest(event.target.value);
            }}
          />
          <button
            type="submit"
            name="costumerButton"
            className="artists--btn"
            onClick={(e) => {
              e.preventDefault();
              if (
                !costumerName &&
                !costumerMail &&
                !costumerInterest &&
                !costumerPhone
              ) {
                return;
              }
              if (!costumerName || !costumerMail || !costumerInterest) {
                alert("Fyll i nog med f??lt s?? vi kan kontakta er!");
                return;
              }
              addCostumer();
              hideAndClearCostumerInput();
            }}
          >
            Bli v??n!
          </button>
        </form>
      </div>
      <div className="header">
        <nav>
          <ul className="menu__list">
            <li>
              <button
                onClick={tabsToggle}
                className="menu__item--btn op__tab op__tab--1 about"
                data-tab="1"
              >
                Om Kaijas
              </button>
            </li>
            <li>
              <button
                onClick={tabsToggle}
                className="menu__item--btn op__tab op__tab--2 stage"
                data-tab="2"
              >
                P?? Scen
              </button>
            </li>
            <li>
              <button
                onClick={tabsToggle}
                className="menu__item--btn op__tab op__tab--3 food"
                data-tab="3"
              >
                Mat & dryck
              </button>
            </li>
            <li>
              <button
                onClick={tabsToggle}
                className="menu__item--btn op__tab ob__tab--4 contact"
                data-tab="4"
              >
                Kontakt
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="food__kaija op__content op__content--0 op__content--active">
        <Salong />
      </div>
      <div className="about__kaija op__content op__content--1">
        <Kaija className="kaija__image" />
        <h2>Farmor Kaija 1964 - 2021</h2>
        <p>
          <strong>"Men det ??r ju som i Wein eller Paris!", </strong> utbrast jag
          glatt n??r vi m??ttes f??r f??rsta g??ngen. Jag satte mig vid pianot och
          sj??ng en finsk tango. Jag blev kvar i 25 ??r.
        </p>
        <p>
          Kaija f??ddes 1946 i byn Paakkila, sju mil fr??n Kuopio i ??stra Finland.
          F??r??ldrarna Kyllikki och Veikko drev jordbruk i Ohtaanniemi och fick
          fem d??ttrar. Hela familjen spelade och sj??ng. Efter ett par ??r av
          str??jobb gick flytten ??? som f??r m??nga finl??ndare ??? till Sverige. Kaija
          arbetade inom skola, barn- och ??ldreomsorg. Med ??ren kom ??ven tre av
          hennes systrar hit.
        </p>
        <p>
          1972 knackade den r??stbeg??vade symaskinsf??rs??ljaren Erkki Suovanen p??
          d??rren. Sicksack blev till ??kta raks??m och 1974 f??ddes sonen Gabriel,
          som blev ber??md operas??ngare och dottern Hilda 1983, som ??r musiker.
        </p>
        <p>
          ??r 1995 f??rverkligade Kaija sin stora livsdr??m och ??ppnade en
          musiksalong. Samma ??r som Kaija l??mnade oss var det 25-??rsjubileum.
          K??nda och ok??nda fick framtr??da och Kaija bredde sm??rg??sar och
          serverade kaffe i porslinskoppar p?? silverbricka. Under
          kristallkronor, lampetter och fotografier m??nade hon om sina bes??kare
          och stamg??ster. Via en v??ggfast telefon i k??ket hanterades
          biljettbokningarna och all betalning skedde kontant ??ver disk.
          Sondottern Saga tar nu ??ver verksamheten i farmors anda ??? v??lf??rsedd
          med blipp och swish.
        </p>
        <p>
          "Kaija spred en harmonisk trivsel omkring sig och salongen blev en
          m??tesplats f??r de som g??rna i ett nu dr??jer kvar i ett d??. Kaija gav
          rum ??t musiken, dikten och de stora k??nslorna med smak och sin kloka
          eftertanke. Bland Stockholms alla formst??pta kaf??kedjor framst??r
          Kaijas musiksalong i dag som ett unikum."
        </p>
        <p>
          <strong>-S??ngare, estrad??r och v??n, Mattias Enn</strong>
        </p>
        <p>
          Den 12 mars 2022, p?? farmor Kaijas f??delsedag, ??ppnade den
          nyrenoverade musiksalongen som vinbar. Med den franska stj??rnkocken
          Louis Cespedes som konceptansvarig och barnbarnet Saga Suovanen som
          ??garinna v??lkomnar vi den som vill uppleva musiken n??rmre, med en
          fr??jd i glaset och i goda v??nners lag. V??lkomna till Kaijas, Sveriges
          minsta live-scen!
        </p>
      </div>
      <div className="stage__kaija op__content op__content--2">
        <Stage className="kaijas__stage" />
        {artistsList.map((val, key) => {
          const name = val.artists_name;
          const genre = val.artists_genre;
          const price = val.artists_price;
          const month = val.artists_date.slice(5, 7);
          const day = val.artists_date.slice(8, 10);
          const time = val.artists_time;
          const desc = val.artists_desc;
          const id = val.artists_id;
          const available = +val.max_guests;

          return (
            <div key={id} className="artists__body">
              <div className={`artists__container artists__container--${id}`}>
                <h1>{name}</h1>
                <p>
                  <span aria-label="Musical Notes" role="img">
                    ????
                  </span>{" "}
                  {genre}
                </p>
                <p>
                  <span aria-label="Spiral Calendar" role="img">
                    ????
                  </span>{" "}
                  {day}/{month}
                  <span aria-label="Alarm Clock" role="img">
                    {" "}
                    ???
                  </span>{" "}
                  {time}
                </p>
                <p>
                  <span aria-label="Admission Ticket" role="img">
                    ????
                  </span>{" "}
                  {price}kr
                </p>
                <p className="artists__desc">{desc}</p>
                <button
                  className={`artists--btn boka--btn btn__id--${id}`}
                  onClick={(event) => {
                    if (available <= 0) {
                      fullyBooked(event.target, id);
                    } else {
                      revielBooking(event.target, id);
                    }
                  }}
                >
                  {available <= 0 ? "V??ntelista" : "Boka"}
                </button>
              </div>
              <div
                className={`fully__booked--div fullyBooked__div--${id} hidden`}
              >
                <button
                  className={`artists__close__box fully_booked_box--close--${id}`}
                >
                  X
                </button>
                <h1>
                  {name} ??r fullbokad!{" "}
                  <span role="img" aria-label="distaunghting-face">
                    ????
                  </span>
                </h1>
                <h2>
                  Vill du skriva upp dig p?? v??ntelistan? Fyll i f??lten nedan.
                </h2>
                <p>
                  Hur m??nga platser vill du skriva upp? Ange h??r:{" "}
                  <select
                    className={`booking__input waiting__input--amount`}
                    name="amount"
                    onChange={(event) => {
                      setWaitingAmount(+event.target.value);
                    }}
                  >
                    <option value="-">-</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="6">7</option>
                    <option value="6">8</option>
                  </select>{" "}
                </p>
                <p>
                  I vilket{" "}
                  <input
                    className={`booking__input waiting__input--name`}
                    type="text"
                    name="bookingName"
                    placeholder="F??r- & efternamn"
                    width="70px"
                    onChange={(event) => {
                      setWaitingName(event.target.value);
                    }}
                  />{" "}
                  vill {waitingAmount > 1 ? "ni" : "du"} skriva upp i?
                </p>
                <p>
                  Vill {waitingAmount > 1 ? "ni" : "du"} ??ta i samband med
                  konserten?{" "}
                  <select
                    className={`booking__input waiting__input--eat`}
                    onChange={(event) => {
                      setWaitingEat(event.target.value);
                    }}
                  >
                    <option value="-">-</option>
                    <option value="Ja">Ja</option>
                    <option value="Nej">Nej</option>
                  </select>
                </p>
                <p>
                  Vart ska vi skicka bekr??ftelsen?{" "}
                  <input
                    className={`booking__input waiting__input--mail`}
                    type="email"
                    name="bookingMail"
                    placeholder="Bokare@mail.com"
                    onChange={(event) => {
                      setWaitingMail(event.target.value);
                    }}
                  />
                </p>
                <p>
                  Vilket nummer kan vi n?? dig p???{" "}
                  <input
                    className={`booking__input waiting__input--phone`}
                    type="text"
                    name="bookingTel"
                    placeholder="0707070707"
                    onChange={(event) => {
                      setWaitingPhone(event.target.value);
                    }}
                  />
                </p>
                <button
                  className={`comfirm__booking--btn comfirm__waiting--btn--${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      !waitingAmount &&
                      !waitingName &&
                      !waitingEat &&
                      !waitingMail &&
                      !waitingPhone
                    ) {
                      return;
                    }
                    if (
                      !waitingAmount ||
                      !waitingName ||
                      !waitingEat ||
                      !waitingMail ||
                      !waitingPhone
                    ) {
                      alert("Fyll i alla f??lt");
                      return;
                    }
                    if (isNaN(waitingAmount) === true || waitingEat === "-") {
                      alert("Var god ange giltiga alternativ");
                      return;
                    }
                    if (waitingPhone.length !== 10) {
                      alert("Fyll i giltigt, 10-siffrigt telefonnummer");
                      return;
                    }
                    waitingList(val);
                  }}
                >
                  Skriv upp
                </button>
              </div>
              <div className={`booking__div booking__div--${id} hidden`}>
                <button
                  className={`artists__close__box artists__box--close--${id}`}
                >
                  X
                </button>
                <h1>
                  Boka: {name}!{" "}
                  <span className="party__emojy" role="img">
                    ????
                  </span>
                </h1>
                <p>
                  Just nu finns det <strong>{available}</strong> platser kvar,
                  hur m??nga platser vill du boka? Ange h??r:{" "}
                  <select
                    className={`booking__input booking__input--amount${id}`}
                    name="amount"
                    onChange={(event) => {
                      setBookingAmount(+event.target.value);
                    }}
                  >
                    <option value="-">-</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="6">7</option>
                    <option value="6">8</option>
                  </select>{" "}
                </p>
                <p>
                  I vilket{" "}
                  <input
                    className={`booking__input booking__input--name${id}`}
                    type="text"
                    name="bookingName"
                    placeholder="F??r- & efternamn"
                    width="70px"
                    onChange={(event) => {
                      setBookingName(event.target.value);
                    }}
                  />{" "}
                  vill {bookingAmount > 1 ? "ni" : "du"} boka i?
                </p>
                <p>
                  Vill {bookingAmount > 1 ? "ni" : "du"} ??ta i samband med
                  konserten?{" "}
                  <select
                    className={`booking__input booking__input--eat${id}`}
                    onChange={(event) => {
                      setBookingEat(event.target.value);
                    }}
                  >
                    <option value="-">-</option>
                    <option value="Ja">Ja</option>
                    <option value="Nej">Nej</option>
                  </select>
                </p>
                <p>
                  {bookingEat === "Nej" ||
                  bookingEat === "-" ||
                  bookingEat === ""
                    ? ""
                    : `Vad kul ${bookingName.split(" ")[0]}, att ${
                        bookingAmount > 1 ? "ni" : "du"
                      } vill ??ta! Kom g??rna i god tid s?? vi hinner servera er lagom till spelningens start!`}
                </p>
                <p>
                  Vart ska vi skicka bekr??ftelsen?{" "}
                  <input
                    className={`booking__input booking__input--mail${id}`}
                    type="email"
                    name="bookingMail"
                    placeholder="Bokare@mail.com"
                    onChange={(event) => {
                      setBookingMail(event.target.value);
                    }}
                  />
                </p>
                <p>
                  Vilket nummer kan vi n?? dig p???{" "}
                  <input
                    className={`booking__input booking__input--tel${id}`}
                    type="text"
                    name="bookingTel"
                    placeholder="0707070707"
                    onChange={(event) => {
                      setBookingTel(event.target.value);
                    }}
                  />
                </p>
                <p>
                  {bookingAmount > 1 ? "Er" : "Din"} total:{" "}
                  <strong>{price * bookingAmount} kr</strong>. Biljettpriset
                  l??ggs p?? notan f??r kv??llen.
                </p>
                <button
                  className={`comfirm__booking--btn comfirm__booking--btn--${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      !bookingAmount &&
                      !bookingName &&
                      !bookingEat &&
                      !bookingMail &&
                      !bookingTel
                    ) {
                      return;
                    }
                    if (
                      !bookingAmount ||
                      !bookingName ||
                      !bookingEat ||
                      !bookingMail ||
                      !bookingTel
                    ) {
                      alert("Fyll i alla f??lt");
                      return;
                    }
                    if (isNaN(bookingAmount) === true || bookingEat === "-") {
                      alert("Var god ange giltiga alternativ");
                      return;
                    }
                    if (bookingTel.length !== 10) {
                      alert("Fyll i giltigt, 10-siffrigt telefonnummer");
                      return;
                    }
                    if (bookingAmount > available) {
                      console.log(bookingAmount, available);
                      alert("Det finns inte tillr??ckligt m??nga platser kvar.");
                      return;
                    }
                    book(val);
                    updateConcert(id, available);
                  }}
                >
                  Boka
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="food__kaija op__content op__content--3">
        <h2>Vi utvecklar v??r meny</h2>
        <p>
          Vi har st??ngt under sommaren och passar d?? p?? att utveckla v??r meny
          tillsammans med{" "}
          <a href="https://instagram.com/cespedes.louis">Louis</a>. Vi ??r ??ter i
          augusti - v??lkomna d??.{" "}
        </p>
      </div>
      <div className="contact__kaija op__content op__content--4">
        <div className="">
          <h2>Kontakta oss</h2>
          <p>
            <strong>Abonnera</strong>
          </p>
          <p>
            Det g??r att abonnera v??r lokal! I en unik milj?? med inredning som
            p??minner om b??rjan av 1900-talets Paris skr??ddarsyr vi kv??llen efter
            era behov. P.S, ??nskar ni levande musik g??r det sj??lvklart att
            ordna.
          </p>
          <a href="mailto:info@kaijasalong.com">info@kaijasalong.com</a>
          <p>
            <strong>Bordsbokning eller st??rre s??llskap</strong>
          </p>
          <p>Vid bordsbokning eller andra fr??gor inf??r ert bes??k.</p>
          <a href="mailto:bokabord@kaijasalong.com">bokabord@kaijasalong.com</a>
          <br />
          <a href="tel:073-4233504">073-423 35 04</a>
          <div className="costumer__form--container">
            <p>
              <strong>
                ??r du artist och vill spela hos oss, p?? Sveriges minsta
                livescen?
              </strong>
            </p>
            <p>
              Klicka p?? knappen nedan och fyll i uppgifterna, s?? ??terkommer vi
              f??r mer detaljer.
            </p>
            <button
              className="artists--btn"
              onClick={(e) => {
                e.preventDefault();
                const formDiv = document.querySelector(".band__form--div");
                const overlay = document.querySelector(".overlay");
                formDiv.classList.remove("hidden");
                overlay.classList.remove("hidden");

                overlay.addEventListener("click", function (e) {
                  e.preventDefault();
                  overlay.classList.add("hidden");
                  formDiv.classList.add("hidden");
                });
              }}
            >
              Klicka h??r!
            </button>
            <div className="band__form--div hidden">
              <form className="band__form">
                <input
                  className="band__input--name"
                  type="text"
                  name="bandName"
                  placeholder="Bandets Namn"
                  onChange={(event) => {
                    setBandName(event.target.value);
                  }}
                />
                <input
                  className="band__input--contact"
                  type="text"
                  name="bandContact"
                  placeholder="Kontaktperson"
                  onChange={(event) => {
                    setBandContact(event.target.value);
                  }}
                />

                <input
                  className="band__input--mail"
                  type="email"
                  name="bandMail"
                  placeholder="Mail"
                  onChange={(event) => {
                    setBandMail(event.target.value);
                  }}
                />
                <input
                  className="band__input--tel"
                  type="tel"
                  name="bandNumber"
                  placeholder="Tel"
                  onChange={(event) => {
                    setBandTel(event.target.value);
                  }}
                />
                <input
                  className="band__input--genre"
                  type="text"
                  name="bandGenre"
                  placeholder="Genre/genres"
                  onChange={(event) => {
                    setBandGenre(event.target.value);
                  }}
                />
                <input
                  className="band__input--link"
                  type="text"
                  name="bandLink-1"
                  placeholder="L??nk till l??t/upptr.."
                  onChange={(event) => {
                    setBandLink(event.target.value);
                  }}
                />
                <input
                  className="band__input--social"
                  type="text"
                  name="bandSocial"
                  placeholder="Social media.."
                  onChange={(event) => {
                    setBandSocial(event.target.value);
                  }}
                />
                <textarea
                  className="band__input--desc"
                  name="bandDesc"
                  placeholder="Beskriv er kort f??r oss. Max 600 bokst??ver"
                  maxLength={"600"}
                  onChange={(event) => {
                    setBandDesc(event.target.value);
                  }}
                />

                <button
                  type="submit"
                  className="artists--btn"
                  name="bandButton"
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      !bandName &&
                      !bandContact &&
                      !bandMail &&
                      !bandTel &&
                      !bandGenre &&
                      !bandLink &&
                      !bandDesc
                    ) {
                      return;
                    }
                    if (
                      !bandName ||
                      !bandContact ||
                      !bandMail ||
                      !bandTel ||
                      !bandGenre ||
                      !bandLink ||
                      !bandDesc
                    ) {
                      alert("Fyll I alla f??lt");
                      return;
                    }
                    addBand();
                    hideAndClearBandInput();
                  }}
                >
                  Skicka f??rfr??gan
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="costumer__form--container">
          <h2>Bli en del av Kaijas-v??nner!</h2>
          <p>
            Som Kaijas-v??n ??r du f??rst att f?? reda p?? alla sp??nnande nyheter hos
            oss. Allt fr??n uppdatering av vinlistan och nyheter p?? menyn, till
            f??rk??p av popul??ra konserter och events. Det ??r sj??lvklart gratis
            att vara v??n!
          </p>
          <button
            className="artists--btn"
            onClick={(e) => {
              e.preventDefault();
              const formDiv = document.querySelector(".costumer__form--div");
              const overlay = document.querySelector(".overlay");
              formDiv.classList.remove("hidden");
              overlay.classList.remove("hidden");

              overlay.addEventListener("click", function (e) {
                e.preventDefault();
                overlay.classList.add("hidden");
                formDiv.classList.add("hidden");
              });
            }}
          >
            Bli v??n!
          </button>
          <div className="costumer__form--div hidden">
            <form className="costumer__form">
              <input
                className="costumer__input--name"
                type="text"
                name="costumerName"
                placeholder="F??r- & efternamn.."
                onChange={(event) => {
                  setCostumerName(event.target.value);
                }}
              />
              <input
                className="costumer__input--mail"
                type="email"
                name="costumerMail"
                placeholder="Mail"
                onChange={(event) => {
                  setCostumerMail(event.target.value);
                }}
              />
              <input
                className="costumer__input--tel"
                type="tel"
                name="costumerNumber"
                placeholder="Tel"
                onChange={(event) => {
                  setCostumerPhone(event.target.value);
                }}
              />
              <textarea
                className="costumer__input--interest"
                type="text"
                name="costumerGenre"
                placeholder="Intresserad av"
                onChange={(event) => {
                  setCostumerInterest(event.target.value);
                }}
              />
              <button
                type="submit"
                name="costumerButton"
                className="artists--btn"
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    !costumerName &&
                    !costumerMail &&
                    !costumerInterest &&
                    !costumerPhone
                  ) {
                    return;
                  }
                  if (!costumerName || !costumerMail || !costumerInterest) {
                    alert("Fyll i nog med f??lt s?? vi kan kontakta er!");
                    return;
                  }
                  addCostumer();
                  hideAndClearCostumerInput();
                }}
              >
                Bli v??n!
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="input__pop--up hidden">
          <div className="artists__input--form">
            <button
              className="close__input--btn"
              onClick={hideAndClearArtistInput}
            >
              X
            </button>
            <div className="artist__box">
              <input
                type="text"
                name="name"
                placeholder="Bandets namn"
                className="input__artist--name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <input
                type="text"
                name="genre"
                placeholder="Genre"
                className="input__artist--genre"
                onChange={(event) => {
                  setGenre(event.target.value);
                }}
              />
              <input
                type="text"
                name="price"
                className="input__artist--price"
                placeholder="Biljettpris"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
              <input
                type="date"
                name="date"
                className="input__artist--date"
                onChange={(event) => {
                  setDate(event.target.value);
                }}
              />
              <input
                type="time"
                name="time"
                className="input__artist--time"
                onChange={(event) => {
                  setTime(event.target.value);
                }}
              />
              <textarea
                type="text"
                name="desc"
                placeholder="Ge en m??lande beskrivning p?? max 600 tecken :)"
                className="input__artist--desc"
                maxLength={"600"}
                onChange={(event) => {
                  setDesc(event.target.value);
                }}
              ></textarea>
              <div className="btn__container">
                <button className="artists--btn" onClick={addArtist}>
                  Ladda upp
                </button>
              </div>
            </div>

            <div className="artists__container">
              <h1>{name}</h1>
              <p>
                <span aria-label="Musical Notes " role="img">
                  ????
                </span>{" "}
                {genre}
              </p>
              <p>
                <span aria-label="Spiral Calendar" role="img">
                  ????
                </span>{" "}
                {date.slice(8, 10)}/{date.slice(5, 7)}
                <span aria-label="Alarm Clock" role="img">
                  {" "}
                  ???
                </span>{" "}
                {time}
              </p>
              <p>
                <span aria-label="Admission Ticket" role="img">
                  ????
                </span>{" "}
                {price} kr
              </p>

              <p className="artists__desc">{desc}</p>
            </div>
          </div>
        </div>
        <a href="https://www.google.com/maps/place/Kaijas+Musiksalong/@59.3334177,18.08639,17z/data=!3m1!4b1!4m5!3m4!1s0x465f9dee2af59155:0x21196749cc621178!8m2!3d59.333415!4d18.0906118">
          Storgatan 44
        </a>
        <a href="https://www.google.com/maps/place/Kaijas+Musiksalong/@59.3334177,18.08639,17z/data=!3m1!4b1!4m5!3m4!1s0x465f9dee2af59155:0x21196749cc621178!8m2!3d59.333415!4d18.0906118">
          114 55 Stockholm
        </a>
        <p>?? 2022 Kaijas Salong AB, 559335-9077</p>

        <div className="login__container">
          <nav>
            <p className="welcome">Artist? Logga in h??r</p>
            <p className="err__msg hidden">Fel inlogg..</p>
            <form className="login">
              <input
                type="text"
                name="user"
                placeholder="Email.."
                className="login__input login__input--user"
                onClick={(event) => getLoginInfo()}
                onChange={(event) => {
                  setUser(event.target.value);
                }}
              />
              <input
                type="password"
                name="pwd"
                placeholder="PIN.."
                className="login__input login__input--pin"
                onChange={(event) => {
                  setPwd(+event.target.value);
                }}
              />
              <button
                className="login__btn"
                onClick={(e) => {
                  e.preventDefault();
                  if (!pwd || !user) return;
                  displayArtistInput(e);
                }}
              >
                &rarr;
              </button>
            </form>
          </nav>
        </div>
        <div className="overlay hidden"></div>
      </div>
    </div>
  );
}

export default App;
