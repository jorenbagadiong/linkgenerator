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

  if (!host) {
    alert("PLEASE CHOOSE HOST");
    return false;
  }

  if (host === "local") {
    const localUrl =
      "http://localhost:3050/start/" +
      bank +
      "?amount=100&accountNumber=mock&paymentReference=" +
      paymentReference +
      "&returnUrl=https://www.google.com&accountName=someName&currency=" +
      currency +
      "&merchantCode=mc&expiryTime=2023-01-01T00:00:00.000Z&payOrderId=123422";

    window.open(localUrl, "_blank");
  }

  if (host === "dev") {
    const devUrl =
      "https://puppeteer.dev.carpentum.tech/start/" +
      bank +
      "?amount=100&accountNumber=mock&paymentReference=" +
      paymentReference +
      "&returnUrl=https://www.google.com&accountName=someName&currency=" +
      currency +
      "&merchantCode=mc&expiryTime=2023-01-01T00:00:00.000Z&payOrderId=55669988";

    window.open(devUrl, "_blank");
  }

  $(".banks").val("");
}
