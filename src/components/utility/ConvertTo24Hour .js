const ConvertTo24Hour = (timeString) => {
    let [time, period] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
  
    if (period === "PM" && hours !== 12) {
      hours += 12; // Convert PM hours (except 12 PM)
    } else if (period === "AM" && hours === 12) {
      hours = 0; // Convert 12 AM to 00
    }
  
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };
  
  export default ConvertTo24Hour;
  