import moment from "moment"

// export const dateFormat = (date) => {
//     return moment(date).format('DD/MM/YYYY')
// }

export const dateFormat = (timestamp) => {
    const date = new Date(parseInt(timestamp, 10));
    return moment(date).format('DD/MM/YYYY');
}

export const timeFormat = (timestamp) => {
    const formattedTime = moment(timestamp).format("hh:mma");  
    return formattedTime;
}

export const dateTime = (date) => {
    return moment(date).format('DD/MM/YYYY | HH:mm:ss');
}

export const isPdfUrl=(url)=> {
  return /\.pdf(\?.*)?$/i.test(url);
}

export const getLabel = (type, next) => {
  const toTitleCase = (str) => 
    str.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

  const label = 
    type === "school"
      ? next === "Student"
        ? "High School"
        : "School or College"
      : type === "institution"
      ? next === "Student"
        ? "Academy"
        : "Institution"
      : type === "company-business"
      ? "Company or Business"
      : type === "network"
      ? "Network or Association"
      : type;

  // Handle special cases where we want to preserve lowercase "or"
  if (label.includes(" or ")) {
    return label.split(" or ")
      .map(part => toTitleCase(part))
      .join(" or ");
  }
  
  return toTitleCase(label);
};

export const updateTimer = (otpExpirationTime, setRemainingTime, setUserDetails) => {
  const currentTime = moment();
  const expirationTime = moment(otpExpirationTime);
  const diffSeconds = expirationTime.diff(currentTime, "seconds");

  if (diffSeconds <= 0) {
    setRemainingTime("");

    setUserDetails((prev) => ({
      ...prev,
      loginDetails: {
        ...prev.loginDetails,
        otp: "Not Generated / Expired",
      },
    }));

    return;
  }

  const minutes = Math.floor(diffSeconds / 60);
  const seconds = diffSeconds % 60;
  setRemainingTime(minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`);
};

export const copyText = (text, setCopyState) => {
    navigator.clipboard.writeText(text);
    return setCopyState("appear");
}


export const openLinkInNewTab = (link) => {
    // Check if the link starts with "http://" or "https://"
    if (!link?.startsWith("http://") && !link?.startsWith("https://")) {
        // If not, prepend "https://"
        link = "https://" + link;
    }

    return window.open(link, '_blank');
};

export const logout = (navigate, setLogoutPop, setIsLoggedIn) => {
    setIsLoggedIn(false)
    localStorage.clear();
    navigate('/');
    setLogoutPop(false);
}

export const isLoggedIn = () => {
    const loggedIn = localStorage.getItem('accessToken')
    if (!loggedIn || loggedIn === 'null' || loggedIn === '') {
        return false;
    } else {
        return true;
    }
}

export const openInMap = (lat, lon) => {
  const userAgent = navigator.userAgent;
  const isIPad = /iPad/.test(userAgent);
  const isIPhone = /iPhone|iPod/.test(userAgent);
  const isIOS = isIPad || isIPhone;
  const isMac = /Macintosh/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);
  const isChrome = /Chrome|CriOS/.test(userAgent);
  const isFirefox = /Firefox|FxiOS/.test(userAgent);
  const isSafari = /Version\/[\d.]+.*Safari/.test(userAgent) && !isChrome; // More strict Safari check

  // 1. Chrome on iOS (opens Apple Maps)
  if (userAgent.includes("CriOS")) {
    window.location.href = `maps://maps?q=${lat},${lon}`;
  } 
  // 2. Firefox on Android (opens Google Maps)
  else if (isFirefox && isAndroid) {
    window.open(`http://www.google.com/maps/search/${lat},${lon}`, "_blank");
  }
  // 3. Firefox on iOS (opens Apple Maps)
  else if (userAgent.includes("FxiOS")) {
    window.location.href = `maps://maps?q=${lat},${lon}`;
  }
  // 4. Safari on iOS or Mac (now opens Apple Maps on both)
  else if (isSafari && (isIOS || isMac)) {
    window.open(`http://maps.apple.com/maps?q=${lat},${lon}`, "_blank");
  }
  // 5. Firefox on Mac (opens Google Maps)
  else if (isFirefox && isMac) {
    window.open(`https://www.google.com/maps/search/${lat},${lon}`, "_blank");
  }
  // 6. Chrome on Android (opens native maps)
  else if (isChrome && isAndroid) {
    window.open(`https://www.google.com/maps/search/${lat},${lon}`, "_blank");
  }
  // 7. Chrome on Windows/Mac/Linux (opens Google Maps)
  else if (isChrome && !isIOS && !isAndroid) {
    window.open(`https://www.google.com/maps/search/${lat},${lon}`, "_blank");
  }
  // 8. Default (Google Maps)
  else {
    window.open(`https://www.google.com/maps/search/${lat},${lon}`, "_blank");
  }
}

export const truncateFileName = (fileName) => {
  const match = fileName.match(/(.*?)(_resume\.\w{3,4})$/i);
  if (!match) return fileName;

  const [_, namePart, resumePart] = match;

  if (namePart.length <= 10) {
    return `${namePart}${resumePart}`; // no truncation needed
  }

  const first10 = namePart.slice(0, 10);
  return `${first10}...${resumePart}`;
};




// export const openInMap = (lat, lon) => {
//     const userAgent = navigator.userAgent;
//     console.log(userAgent)
//     // Check if the user agent indicates an iOS device
//     if (userAgent.includes("CriOS")) {
//       // This is Google Chrome on iOS
//       window.location.href = `maps://maps?q=${lat},${lon}`;
//     } else if (
//       userAgent.includes("Mozilla") &&
//       (userAgent.includes("Android") || userAgent.includes("Linux"))
//     ) {
//       // It's Firefox on Android
//       const url = `http://www.google.com/maps/search/${lat},${lon}`;
//       window.open(url, "_blank");
//     } else if (userAgent.includes("Mozilla") && userAgent.includes("FxiOS")) {
//       // const url = `http://maps.apple.com/maps?q=${lat},${lon}`;
//       // window.open(url, "_blank");
//       // window.location.href = url
//       window.location.href = `maps://maps?q=${lat},${lon}`;
//     } else if (userAgent.includes("Safari") && !userAgent.includes("CriOS")) {
//       // This is Safari on iOS
//       const url = `http://maps.apple.com/maps?q=${lat},${lon}`;
//       window.open(url, "_blank");
//     } else if (
//       userAgent.includes("Mozilla") &&
//       userAgent.includes("Macintosh") &&
//       userAgent.includes("Firefox")
//     ) {
//       // This is Firefox on Mac OS
//       const url = `http://maps.apple.com/maps?q=${lat},${lon}`;
//       window.open(url, "_blank");
//     } else {
//       // It's neither Chrome nor Safari on iOS
//       const url = `https://www.google.com/maps/search/${lat},${lon}`;
//       window.open(url, "_blank");
//     }
// }

export const userLocation = (city, country) => {
    const location = "-";
    if (city && country) return city + ", " + country;
    if (city && !country) return city;
    if (!city && country) return country;
    return location;
}

// CHECKING VALID GMAIL
export const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

export const capitalizeWords = (str) => {
    return str.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}