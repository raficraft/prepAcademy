export const dispatchStorage = function (method) {
  //Traitements des données

  switch ((method, data)) {
    case "whishlist":
      whishlist(data);
      break;
    case "favorite":
      break;
    case "bookmark":
      break;
    case "notation":
      break;
  }
  return false;
};

function whishlist(data) {
  console.log(data);
  return;
}
function bookmark() {
  return;
}
function favorite() {
  return;
}
function notation() {
  return;
}
