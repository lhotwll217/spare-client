export default function markerColorRandomizer() {
  switch (Math.round(5 * Math.random())) {
    case 0:
      return "pin1 yellow";
    case 1:
      return "pin1 orange";
    case 2:
      return "pin1 pink";
    case 3:
      return "pin1 blue";
    case 4:
      return "pin1 green";
    case 5:
      return "pin1 red";
    default:
      return "pin1 blue";
  }
}
