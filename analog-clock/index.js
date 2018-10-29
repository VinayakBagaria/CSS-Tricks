const secHand = document.querySelector(".second-hand");
const minHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");

function min() {
  const todayDate = new Date();

  const dateSec = todayDate.getSeconds();
  const dateMin = todayDate.getMinutes();
  const dateHour = todayDate.getHours();

  const dateSecInDegree = (dateSec / 60) * 360 + 90;
  const dateMinInDegree = (dateMin / 60) * 360 + 90;
  const dateHourInDegree = (dateHour / 12) * 360 + 90;

  secHand.style.transform = `translateY(-6px) rotate(${dateSecInDegree}deg)`;
  minHand.style.transform = `rotate(${dateMinInDegree}deg)`;
  hourHand.style.transform = `rotate(${dateHourInDegree}deg)`;
}

setInterval(min, 1000);
