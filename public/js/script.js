// Device Registration Variables
const idModalEl = document.getElementById("form-add-device");
const confirmModalEl = document.getElementById("confirmModal");
const confirmBtnEl = document.getElementById("confirmBtn");
const displayToken = document.getElementById("displayToken");

const data = {};
idModalEl.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const formData = evt.target;
  for ([k, v] of Object.entries(formData)) {
    if (v.type !== "submit") data[v.name] = v.value;
  }
  confirmModal(data);
});

const confirmModal = (data) => {
  confirmModalEl.innerHTML = "";
  let html = `
    <div class="unit">
        <img src="/images/user-avatar.png" alt="user-avatar"  width="64px" height="64px"/>
        <h2>USER</h2>
        <h3> ${data.name ? data.name : "Customer"}</h3>
    </div>
    <div class="confirm">
        <div class="unit">
            <img src="/images/phone-icon.png" alt="phone-icon" />
            <h2>PHONES</h2>
            <h3> ${data.phone_qty ? data.phone_qty : 0}</h3>
        </div>
        <div class="unit">
            <img src="/images/powerbank-icon.png" alt="powerbank-icon"/>
            <h2>POWERBANKS</h2>
            <h3>${data.pb_qty ? data.pb_qty : 0}</h3>
        </div>
        <div class="unit">
            <img src="/images/laptop-icon.png" alt="laptop-icon" />
            <h2>LAPTOPS</h2>
            <h3> ${data.laptop_qty ? data.laptop_qty : 0}</h3>
        </div>
        
    </div>
    `;
  confirmModalEl.insertAdjacentHTML("afterbegin", html);
};
confirmBtnEl.addEventListener("click", async () => {
  try {
    let res = await fetch("/admin/add-device", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    const d = await res.json();
    genIDModal(d);
    console.log(d);
  } catch (err) {
    console.log(err);
  }
});
const genIDModal = (data) => {
  displayToken.innerHTML = "";
  let html = `
        <div class="tokenArea">
        
            <h1>${
              data.status ? "👍" + data.message.code : "👎" + data.message
            }</h1>
        </div>
    `;
  displayToken.insertAdjacentHTML("afterbegin", html);
};
