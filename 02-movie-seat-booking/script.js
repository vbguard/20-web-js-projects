const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

// check if we have in localStorage data and populateUI
populateUI();

let ticketPrice = +movieSelect.value;

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  selectedSeats !== null &&
    selectedSeats.length > 0 &&
    seats.forEach(
      (seat, index) =>
        selectedSeats.indexOf(index) > -1 && seat.classList.add("selected")
    );

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null)
    movieSelect.selectedIndex = selectedMovieIndex;
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedListsCount = selectedSeats.length;

  count.innerText = selectedListsCount;
  total.innerText = selectedListsCount * ticketPrice;
}

// Seat select listener
container.addEventListener("click", function(e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// movie change listener
movieSelect.addEventListener("change", function(e) {
  ticketPrice = +e.target.value;
  const selectedMovieIndex = e.target.selectedIndex;
  const selectedMoviePrice = e.target.value;

  setMovieData(selectedMovieIndex, selectedMoviePrice);
  updateSelectedCount();
});

// initial count total
updateSelectedCount();
