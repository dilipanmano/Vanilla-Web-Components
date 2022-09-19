const template = document.createElement("template");
template.innerHTML = `
<style> 
    h3 { color:orange }
    .user-card {
        display: grid;
        grid-template-columns: 1fr 2fr;
        //grid-gap: 10%;
        width: 500px;
        margin-bottom: 15px;
        border-bottom: 5px solid;
    }
    .user-card button {
        border: 0;
        border-radius: 5px;
        padding: 5px 10px;

    }
    .user-card img {
        width: 100%;
    }
</style> 
<div class="user-card">
    <div>
        <img></img>
    </div>
    <h3></h3>
    <div class="info">
        <p><slot name="Email"/></p>
        <p><slot name="Phone"/></p>
    </div>
    <button id="toggle">Hide Info</button>
</div>`;

class UserCard extends HTMLElement {
    constructor() {
        super();
        this.showInfo = true;
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        /* this.innerHTML = `<style> 
                          h3 { color:orange }
                          </style> 
                          <h3>${this.getAttribute("name")}</h3>`; */
        this.shadowRoot.querySelector("h3").innerText =
            this.getAttribute("name");
        this.shadowRoot.querySelector("img").src = this.getAttribute("avatar");
    }

    toggleInfo() {
        //console.log("asdf");
        this.showInfo = !this.showInfo;
        const info = this.shadowRoot.querySelector(".info");
        const toggleBtn = this.shadowRoot.querySelector("#toggle");
        if (this.showInfo) {
            info.style.display = "Block";
            toggleBtn.innerText = "Hide Info";
        } else {
            info.style.display = "none";
            toggleBtn.innerText = "Show Info";
        }
    }

    connectedCallback() {
        console.log(1230);
        this.shadowRoot
            .querySelector("#toggle")
            .addEventListener("click", () => this.toggleInfo());
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector("#toggle").removeEventListener;
    }
}

window.customElements.define("user-card", UserCard);
