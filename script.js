document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".booking-form");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const button = form.querySelector("button");
      const originalText = button.textContent;
      button.textContent = "Request Sent";
      button.disabled = true;

      showToast("Your puja request has been noted. We will contact you soon.");

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        form.reset();
      }, 2000);
    });
  }

  const quotes = [
    "कर्म करो, फल की चिंता न करो; मन शुद्ध रखो, प्रभु का स्मरण करो।",
    "सत्य, शांति, सेवा और स्मरण — यही जीवन का सबसे सुंदर मार्ग है।",
    "हर दिन एक छोटी-सी पूजा, मन को गहराई से शांति देती है।",
    "धर्म के साथ जीवन चलते हुए, मन में प्रेम और शांति का साम्राज्य हो।",
    "भक्ति में विश्वास रखें; प्रभु आपके प्रयासों को दिशा देंगे।",
    "अच्छे विचारों से ही अच्छा जीवन बनता है, शुभ साधना से ही मन प्रसन्न होता है।"
  ];

  const quoteEl = document.getElementById("daily-quote");
  if (quoteEl) {
    let quoteIndex = 0;
    quoteEl.textContent = `“${quotes[quoteIndex]}”`;

    setInterval(() => {
      quoteIndex = (quoteIndex + 1) % quotes.length;
      quoteEl.textContent = `“${quotes[quoteIndex]}”`;
    }, 7000);
  }

  const muhuratData = [
    {
      title: "शुभ मुहूर्त",
      time: "6:15 AM - 7:25 AM",
      detail: "शुभ कार्य: पूजा, आरंभ, खरीदारी, हवन, नमस्कार"
    },
    {
      title: "सुबह का शुभ समय",
      time: "7:35 AM - 8:45 AM",
      detail: "शुभ कार्य: पवित्र पाठ, आरती, परिवारिक पूजा, आशिर्वाद"
    },
    {
      title: "दोपहर शुभ काल",
      time: "12:10 PM - 1:20 PM",
      detail: "शुभ कार्य: दीपदान, गृह प्रवेश, पूजा, प्रार्थना"
    },
    {
      title: "संध्या शुभ समय",
      time: "6:10 PM - 7:20 PM",
      detail: "शुभ कार्य: आरती, पूजा, मंत्र जप, शांति हवन"
    }
  ];

  const muhuratTitle = document.getElementById("muhurat-title");
  const muhuratTime = document.getElementById("muhurat-time");
  const muhuratDetail = document.getElementById("muhurat-detail");

  if (muhuratTitle && muhuratTime && muhuratDetail) {
    const todayIndex = new Date().getDate() % muhuratData.length;
    const todayMuhurat = muhuratData[todayIndex];
    muhuratTitle.textContent = todayMuhurat.title;
    muhuratTime.textContent = todayMuhurat.time;
    muhuratDetail.textContent = todayMuhurat.detail;
  }

  const statusEl = document.getElementById("day-status");
  if (statusEl) {
    const statusMessages = [
      "आज का दिन सकारात्मक ऊर्जा, पूजा और परिवारिक संतुलन के लिए शुभ है।",
      "आज पूजा, दान और शांत मन से शुभ कार्य करने का सही समय है।",
      "आज का दिन आध्यात्मिक विचार, प्रार्थना और आंतरिक शांति के लिए बहुत लाभकारी है।",
      "आज का दिन नए आरंभ, शुभ विचार और ऊर्जा वर्धन के लिए अनुकूल है।"
    ];
    const index = new Date().getDate() % statusMessages.length;
    statusEl.textContent = statusMessages[index];
  }

  const toggleButton = document.getElementById("alert-button");
  if (toggleButton) {
    const savedState = localStorage.getItem("dailySpiritualAlertEnabled") === "true";
    toggleButton.textContent = savedState ? "Daily Alerts Enabled" : "Enable Daily Alert";
    toggleButton.setAttribute("aria-pressed", String(savedState));
    if (savedState) {
      toggleButton.classList.add("alert-enabled");
    }

    toggleButton.addEventListener("click", () => {
      const enabled = localStorage.getItem("dailySpiritualAlertEnabled") === "true";
      const nextState = !enabled;

      localStorage.setItem("dailySpiritualAlertEnabled", String(nextState));
      toggleButton.textContent = nextState ? "Daily Alerts Enabled" : "Enable Daily Alert";
      toggleButton.setAttribute("aria-pressed", String(nextState));
      toggleButton.classList.toggle("alert-enabled", nextState);

      showToast(nextState ? "Daily spiritual alerts enabled." : "Daily alerts disabled.");

      if (nextState && "Notification" in window) {
        Notification.requestPermission().catch(() => {});
      }
    });
  }

  const showDailyAlert = () => {
    const shouldSend = localStorage.getItem("dailySpiritualAlertEnabled") === "true";
    if (!shouldSend) return;

    const now = new Date();
    const text = `🌼 आज का शुभ संदेश: “कर्म करो, फल की चिंता न करो।”\n🕉️ शुभ समय: ${muhuratData[now.getDate() % muhuratData.length].time}`;

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("ॐ SANATAN SEVA", { body: text });
    } else {
      showToast(text);
    }
  };

  setInterval(() => {
    const now = new Date();
    if (now.getHours() === 8 && now.getMinutes() === 0 && now.getSeconds() < 5) {
      showDailyAlert();
    }
  }, 5000);
});

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}
