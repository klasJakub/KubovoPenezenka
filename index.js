class KubovoPenezenka {

    colorModeListeners() {
        const listener = (event) => {
            const element = event.target;
            this.setColorMode(element.id);
            if (element.id === "dark") {
                this.themeSwitch.checked = true;
            } else {
                this.themeSwitch.checked = false;
            }
            localStorage.setItem("theme", element.id);
        };
        this.themeSwitch.addEventListener("change", (e) => {
            const target = e.target
            as
            HTMLInputElement;
            if (target.checked) {
                this.setColorMode("dark");
                localStorage.setItem("theme", "dark");
            } else {
                this.setColorMode("light");
                localStorage.setItem("theme", "light");
            }
        })
        document.getElementById("light").addEventListener("click", listener);
        document.getElementById("dark").addEventListener("click", listener);
    }

    setColorMode(mode) {
        document
            .getElementsByTagName("body")
            .item(0)
            .classList.remove("light", "dark");
        document
            .getElementsByTagName("body")
            .item(0)
            .classList.add(mode);
    }
}