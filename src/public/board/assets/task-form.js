const modal = document.getElementById("myModal");
const form = document.getElementById("form");
const close = document.getElementById("closeModalBtn");

close.addEventListener("click", () => {
  modal.style.display = "none";
  form.reset();
});

const iconRadioButons = document.querySelectorAll('input[name="icon"]');
iconRadioButons.forEach((icon) => {
  icon.addEventListener("change", async () => {
    if (icon.checked) {
      const iconUrl = document
        .querySelector(`label[for="${icon.id}"]`)
        .querySelector("img").src;
      icon.value = iconUrl;
    }
  });
});
