class KubovoPenezenka {


    //test

    constructor() {
        this.themeSwitch = document.getElementById(
            "theme-switch");
        if (localStorage.getItem("theme")) {
            const mode = localStorage.getItem("theme");
            this.setColorMode(mode);
            if (mode === "dark") {
                this.themeSwitch.checked = true;
            }
        } else {
            localStorage.setItem("theme", "light");
            this.setColorMode("light");
        }
        this.transactions = this.generateRandomTransactions();
        console.log(this.transactions);
        console.log(this.transactions.map(item => item.amount).reduce((prev, next) => prev + next));
        this.colorModeListeners();
    }

    generateRandomTransactions() {
        let transactions = [];
        for (let i = 0; i < Math.floor(Math.random() * 100); i++) {
            const amount = Math.random() < 0.5 ? Math.floor(Math.random() * 100) : -Math.floor(Math.random() * 100);
            transactions.push({id: i, amount});
        }
        return transactions;
    }

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

const main = new KubovoPenezenka()