const ConvertTo12Hour = (timeString) => {
    let [hours, minutes] = timeString.split(":");
    hours = parseInt(hours);
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
  };

  export default ConvertTo12Hour;