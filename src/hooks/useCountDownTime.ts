import { useState, useEffect } from "react";

const calculateTimeLeft = (endTime:any) => {
  // let year = new Date().getFullYear();
  // let month = new Date().getMonth();
  // let difference = +new Date(`${month + 2}/10/${year}`) - +new Date();
  // let difference = +new Date(`${9}/7/${2022}`) - +new Date();
  let difference = +new Date(endTime) - +new Date();

  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const useCountDownTime = (endTime:any) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(endTime));
    }, 1000);
    return () => clearTimeout(timer);
  });

  return timeLeft;
};

export default useCountDownTime;
