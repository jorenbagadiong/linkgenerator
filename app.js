$(document).ready(function () {
  theme();
});

function theme() {
  const theme = localStorage.getItem("theme");
  if (!theme) {
    localStorage.setItem("theme", "light");
  }

  themeChanger();
}

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

const PAYEES = [
  {
    code: "mock",
    value: "mock",
    selected: true,
  },
  {
    code: "ICICI",
    value: "TEST01",
  },
  {
    code: "HDFC",
    value: "HDFC01",
  },
  {
    code: "KOTAK - No MMID",
    value: "KOTAK01",
  },
  {
    code: "Public Bank",
    value: "MALTEST3",
  },
  {
    code: "AMBank",
    value: "MALTEST2",
  },
  {
    code: "OCBC",
    value: "MALTEST1",
  },
  {
    code: "TTBDirect",
    value: "TEST_TTB",
  },
  {
    code: "Bangkok Bank",
    value: "TEST_BANGKOK",
  },
  {
    code: "Government Saving Bank",
    value: "TEST_GSB",
  },
  {
    code: "ACB",
    value: "TEST_VIET_ACB",
  },
  {
    code: "SACOM",
    value: "TEST_VIET_SACOM",
  },
  {
    code: "TECHCOM",
    value: "TEST_VIET_TECHCOM",
  },
  {
    code: "ABSA",
    value: "TEST_ABSA",
  },
  {
    code: "CAPITEC",
    value: "TEST_CAPITEC",
  },
  {
    code: "FNB",
    value: "TEST_FNB",
  },
  {
    code: "STANDARD",
    value: "TEST_STANDARD",
  },
];

$(document).ready(function () {
  loadBanks();
});

function loadBanks() {
  PAYEES.map((payee) => {
    $("#payees").append(
      `<option value="${payee.value}" ${payee.selected ? "selected" : ""}>${
        payee.code
      }</option>`
    );
  });

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
  const amount = $("#amount").val();
  const payee = $("#payees").val();
  let url;

  if (!host) {
    alert("PLEASE CHOOSE HOST");
    return false;
  }

  if (host === "local") {
    url = `http://localhost:3050/start/${bank}?amount=${amount}&accountNumber=${payee}&paymentReference=${paymentReference}&returnUrl=https://www.google.com&accountName=someName&currency=${currency}&merchantCode=mc&expiryTime=2023-01-01T00:00:00.000Z&payOrderId=123422`;
  }

  if (host === "dev") {
    if (currency === "MYR") {
      url = `https://puppeteer.dev.transtech.one/start/${bank}?amount=${amount}&accountNumber=${payee}&paymentReference=${paymentReference}&returnUrl=https://www.google.com&accountName=someName&currency=${currency}&merchantCode=mc&expiryTime=2023-01-01T00:00:00.000Z&payOrderId=123422`;
    } else if (currency === "ZAR") {
      url = `https://puppeteer.dev.spinpay.in/start/${bank}?amount=${amount}&accountNumber=${payee}&paymentReference=${paymentReference}&returnUrl=https://www.google.com&accountName=someName&currency=${currency}&merchantCode=mc&expiryTime=2023-01-01T00:00:00.000Z&payOrderId=123422`;
    } else {
      url = `https://puppeteer.dev.carpentum.tech/start/${bank}?amount=${amount}&accountNumber=${payee}&paymentReference=${paymentReference}&returnUrl=https://www.google.com&accountName=someName&currency=${currency}&merchantCode=mc&expiryTime=2023-01-01T00:00:00.000Z&payOrderId=123422`;
    }
  }

  window.open(url, "_blank");
  $(".banks").val("");
}

$(".switcher-btn").click(function () {
  $(this).toggleClass("active");
  if ($(this).hasClass("active")) {
    $(".theme-buttons-container").show();
  } else {
    $(".theme-buttons-container").hide();
  }
});

$(".theme-button").click(function () {
  const theme = $(this).attr("data-color");
  localStorage.setItem("theme", theme);
  themeChanger();
});

function themeChanger() {
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    $(":root").css("--backGround", "#040414");
    $(":root").css("--fontColor", "#fff");
    $(":root").css("--borderColor", "#fff");
  }

  if (theme === "light") {
    $(":root").css("--backGround", "#fff");
    $(":root").css("--fontColor", "#4d4d4d");
    $(":root").css("--borderColor", "#4d4d4d");
  }

  if (theme === "gradient") {
    $(":root").css(
      "--backGround",
      "linear-gradient(217deg,rgba(255, 0, 0, 0.8),rgba(255, 0, 0, 0) 70.71%),linear-gradient(127deg, rgba(0, 255, 0, 0.8), rgba(0, 255, 0, 0) 70.71%),linear-gradient(336deg, rgba(0, 0, 255, 0.8), rgba(0, 0, 255, 0) 70.71%)"
    );
    $(":root").css("--fontColor", "#fff");
    $(":root").css("--borderColor", "#fff");
  }
}
