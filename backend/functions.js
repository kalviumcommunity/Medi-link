// functions.js

export function findHospital(city) {
  const hospitals = {
    chennai: ["Apollo Hospitals", "Fortis Malar", "MIOT International"],
    bangalore: ["Narayana Health", "Manipal Hospital", "Columbia Asia"],
    delhi: ["AIIMS", "Fortis Escorts", "Max Healthcare"]
  };

  return hospitals[city.toLowerCase()] || ["No hospitals found in this city."];
}
