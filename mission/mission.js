// Select dropdown and logo
const themeSelector = document.querySelector("#theme-selector");
const body = document.querySelector("body");
const logo = document.querySelector(".logo");

// Function to change theme
function changeTheme() {
  const theme = themeSelector.value;
  console.log("Theme selected:", theme); // debug

  if (theme === "dark") {
    body.classList.add("dark");
    logo.src = "images/logo-white.webp"; // white logo for dark theme
    logo.alt = "BYUI logo white";
  } else {
    body.classList.remove("dark");
    logo.src = "images/logo.webp";       // blue logo for light theme
    logo.alt = "BYUI logo blue";
  }
}

// Event listener
themeSelector.addEventListener("change", changeTheme);

// Run on page load
changeTheme();


