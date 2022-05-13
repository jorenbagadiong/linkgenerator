const INR_BANKS = [
  "axis",
  "brda",
  "canbk",
  "hdfc",
  "icici",
  "idbi",
  "indu",
  "kotak",
  "kotbk",
  "pnjb",
  "sbi",
  "yesb",
];

const MYR_BANKS = [
  "my_amb",
  "my_cimb",
  "my_hlb",
  "my_hsbc",
  "my_mayb",
  "my_ocbc",
  "my_public",
  "my_rhb",
  "my_uobib",
];

const THB_BANKS = [
  "th_bangkok",
  "th_governmentsavings",
  "th_kasikorn",
  "th_krungthai",
  "th_krungsri",
  "th_siam",
  "th_ttbdirect",
  "th_uobt",
];

const VND_BANKS = [
  "vn_acb",
  "vn_bidv",
  "vn_donga",
  "vn_exim",
  "vn_sacom",
  "vn_techcom",
  "vn_tp",
  "vn_vietcom",
  "vn_vietin",
  "vn_vp",
];

const ZAR_BANKS = ["za_absa", "za_capitec", "za_fnb", "za_standard"];

$(document).ready(function () {
  loadBanks();
});

function loadBanks() {
  INR_BANKS.map((bank) => {
    $("#inrBank").append(`<option value="${bank}">${bank}</option>`);
  });

  MYR_BANKS.map((bank) => {
    $("#myrBank").append(`<option value="${bank}">${bank}</option>`);
  });

  THB_BANKS.map((bank) => {
    $("#thbBank").append(`<option value="${bank}">${bank}</option>`);
  });

  VND_BANKS.map((bank) => {
    $("#vndBank").append(`<option value="${bank}">${bank}</option>`);
  });

  ZAR_BANKS.map((bank) => {
    $("#zarBank").append(`<option value="${bank}">${bank}</option>`);
  });
}

$("#host").change(function () {
  $(".banks").val("");
});

$("#mock").change(function () {
  const currency = "INR";
  getPaymentReference(currency, $(this).val());
});

$("#inrBank").change(function () {
  const currency = "INR";
  getPaymentReference(currency, $(this).val());
});

$("#myrBank").change(function () {
  const currency = "MYR";
  getPaymentReference(currency, $(this).val());
});

$("#thbBank").change(function () {
  const currency = "THB";
  getPaymentReference(currency, $(this).val());
});

$("#vndBank").change(function () {
  const currency = "VND";
  getPaymentReference(currency, $(this).val());
});

$("#zarBank").change(function () {
  const currency = "ZAR";
  getPaymentReference(currency, $(this).val());
});

function getPaymentReference(currency, bank) {
  const host = $("#host").val();
  const date = new Date();
  const paymentReference = date.getTime();
  let url;

  if (!host) {
    alert("PLEASE CHOOSE HOST");
    return false;
  }

  if (host === "local") {
    url =
      "http://localhost:3050/start/" +
      bank +
      "?amount=100&accountNumber=mock&paymentReference=" +
      paymentReference +
      "&returnUrl=https://www.google.com&accountName=someName&currency=" +
      currency +
      "&merchantCode=mc&expiryTime=2023-01-01T00:00:00.000Z&payOrderId=123422";
  }

  if (host === "dev") {
    url =
      "https://puppeteer.dev.carpentum.tech/start/" +
      bank +
      "?amount=100&accountNumber=mock&paymentReference=" +
      paymentReference +
      "&returnUrl=https://www.google.com&accountName=someName&currency=" +
      currency +
      "&merchantCode=mc&expiryTime=2023-01-01T00:00:00.000Z&payOrderId=55669988";
  }

  if (host === "stable") {
    url =
      "https://puppeteer.stable.carpentum.tech/start/" +
      bank +
      "?amount=100&accountNumber=mock&paymentReference=" +
      paymentReference +
      "&returnUrl=https://www.google.com&accountName=someName&currency=" +
      currency +
      "&merchantCode=mc&expiryTime=2023-01-01T00:00:00.000Z&payOrderId=55669988";
  }

  window.open(url, "_blank");
  $(".banks").val("");
}
