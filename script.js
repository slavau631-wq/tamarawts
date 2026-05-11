const contactConfig = {
  name: "Tamara",
  whatsappNumber: "380637921092",
  avatarUrl: "./avatar.jpg",
  outgoingMessage: "Здравствуйте! Хочу записаться на расклад Таро.",
  buttonLabel: "Перейти в WhatsApp"
};

const profileName = document.getElementById("profileName");
const ctaButton = document.getElementById("ctaButton");
const avatarImage = document.getElementById("profileAvatar");
const avatarFallback = document.getElementById("avatarFallback");

function getInitials(name) {
  const cleanName = name.trim();

  if (!cleanName) {
    return "WA";
  }

  return cleanName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function buildWhatsAppLink(number, message) {
  const cleanNumber = number.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

function trackLead() {
  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead");
  }
}

function handleCtaClick(event) {
  const targetUrl = ctaButton.href;

  if (!targetUrl) {
    return;
  }

  if (typeof window.fbq !== "function") {
    return;
  }

  event.preventDefault();
  trackLead();

  window.setTimeout(() => {
    window.location.href = targetUrl;
  }, 250);
}

function renderProfile(config) {
  profileName.textContent = config.name;
  ctaButton.textContent = config.buttonLabel;
  ctaButton.href = buildWhatsAppLink(config.whatsappNumber, config.outgoingMessage);
  avatarFallback.textContent = getInitials(config.name);
  ctaButton.addEventListener("click", handleCtaClick);

  if (config.avatarUrl.trim()) {
    avatarImage.src = config.avatarUrl;
    avatarImage.onload = () => {
      avatarImage.hidden = false;
      avatarFallback.hidden = true;
    };
    avatarImage.onerror = () => {
      avatarImage.hidden = true;
      avatarFallback.hidden = false;
    };
  }
}

renderProfile(contactConfig);
