import IMask from "imask";

export function format_num(val = 0, scale = 0) {
  let mask = IMask.createMask({
    mask: Number,
    scale,
    min: -9999999999999,
    thousandsSeparator: ",",
    radix: ".",
  });
  let val_num = typeof val == "string" ? val.trim() : val;
  let num = parseFloat(val_num || 0).toString();
  mask.resolve(num);
  return `${mask.value}`;
}
export function format_fecha(fecha, id) {
  let element = document.getElementById(`${id}`);
  let maskOptions = {
    mask: "****-**-**",
  };
  let mask = IMask(element, maskOptions);
}
export function variable_num({ val, max = 0, decimal = undefined }) {
  let v_mask;
  let comas =
    max < 3 ? 0 : max % 3 === 0 ? Math.trunc(max / 3) - 1 : Math.trunc(max / 3);
  let first_num = max % 3 === 0 ? 3 : max % 3;
  v_mask = Array.from({ length: max + comas }, (v, i) => {
    if (first_num !== 0 && i == first_num) return ",";
    else if (comas !== 0 && (i - first_num) % 4 === 0) return ",";
    else return "0";
  }).join("");

  if (decimal != undefined) v_mask += "." + "0".repeat(decimal);
  let mask = IMask.createMask({
    mask: v_mask,
  });
  mask.resolve(val);
  return mask.value;
}

export function format_ip(ip) {
  let element = document.getElementById(`${ip}`);
  let maskOptions = {
    mask: "000.000.000.000",
  };
  let mask = IMask(element, maskOptions);
}
export function format_Mac() {
  let element = document.getElementById("mac");
  let maskOptions = {
    mask: "**-**-**-**-**-**",
  };
  let mask = IMask(element, maskOptions);
  // mask.updateValue(element.value = element.value.toUpperCase())
}
export const format_op = (value) => {
  return parseFloat(value) || 0;
};
export function phoneNumberImask() {
  console.log("hello");
  let phoneMask = IMask(document.getElementById("phone_number"), {
    mask: "+{57} (000) 0000000",
  });
  return phoneMask;
}
export function documentNumberImask() {
  let numberMask = IMask(document.getElementById("document"), {
    mask: Number,
    min: 0,
    max: 99999999999999,
  });
  return numberMask;
}

export function image_base64(url) {
  return new Promise((res) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        res(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  });
}
export function nameToUper(field) {
  if (field) {
    field = field.toLowerCase();
    let name = field.split(" ");
    name = name.map((p) => p && p[0].toUpperCase() + p.substring(1));
    return name.join(" ");
  }
}

const AUTH = sessionStorage.auth_code;
export let current_user = AUTH ? JSON.parse(atob(AUTH)).data : null;
export const NEKOT = AUTH ? JSON.parse(atob(AUTH)).token : null;
