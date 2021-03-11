const utilities = {
  numberWithCommas(x) {
    if(Number.isFinite(x)){
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    } else {
      return;
    }
  }
}

export default utilities