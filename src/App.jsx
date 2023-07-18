import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const cleanForm = {
    hours: '',
    minuts: '',
    seconds: '',
  }

  const [timer, setTimer] = useState(cleanForm)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (seconds > 0 && isActive) {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [seconds, isActive]);

  function handleChange(e) {
    const { name, value } = e.target;

    setTimer((old) => ({
      ...old,
      [name]: value,
    }));
  }

  function getSeconds() {
    const hoursInSeconds = Number(timer.hours) * 60 * 60
    const minutsInSeconds = Number(timer.minuts) * 60
    const seconds = Number(timer.seconds)

    return hoursInSeconds + minutsInSeconds + seconds;
  }

  function submitTimer(e) {
    e.preventDefault();

    setSeconds(getSeconds);

    setIsActive(true)

    setTimer(cleanForm)
  }

  function timeHandler(duration) {
    return duration > 9 ? duration : `0${duration}`
  }

  function convertToTimer() {
    let hours = Math.floor((seconds / 60 / 60) % 24)
    let minuts = Math.floor((seconds / 60) % 60)
    let sec = Math.floor(seconds % 60)

    return (
      <>
        {timeHandler(hours)}:{timeHandler(minuts)}:{timeHandler(sec)}
      </>
    );
  }

  return (
    <div className="app">
      <form onSubmit={(e) => submitTimer(e)}>
        <label>
          Часов:
          <input
            placeholder="Введите часы"
            name="hours"
            type="text"
            value={timer.hours}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Минут:
          <input
            placeholder="Введите минуты"
            name="minuts"
            type="text"
            value={timer.minuts}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Секунд:
          <input
            placeholder="Введите секунды"
            name="seconds"
            type="text"
            value={timer.seconds}
            onChange={handleChange}
          ></input>
        </label>

        <button type="submit">Запустить</button>
      </form>

      <span>
        {convertToTimer()}
        <button onClick={() => {setSeconds(0)}}>Сброс</button>
      </span>
    </div>
  );
}

export default App;
