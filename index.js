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
        if (localStorage.getItem("transactions") === null) {
            this.transactions = this.generateRandomTransactions();
            localStorage.setItem("transactions", JSON.stringify(this.transactions));
        } else {
            this.transactions = JSON.parse(localStorage.getItem("transactions"));
        }
        console.log(this.transactions);
        console.log();
        this.generateListItemsFromTransactions();
        this.colorModeListeners();
    }

    generateRandomTransactions() {
        let transactions = [];
        const startDate = new Date('2020-01-01T01:00:00');
        const today = new Date();
        for (let i = 0; i < Math.floor(Math.random() * 100); i++) {
            const amount = Math.random() < 0.5 ? Math.floor(Math.random() * 100) : -Math.floor(Math.random() * 100);
            const date = new Date(startDate.getTime() + Math.random() * (today.getTime() - startDate.getTime()));
            transactions.push({id: i, amount, date});
        }
        return transactions.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });
    }

    generateListItemsFromTransactions() {
        const htmlList = document.getElementById("transaction-list");
        for (let transaction of this.transactions) {
            let item = document.createElement("li");
            let amount = document.createElement("div");
            amount.innerText = `${transaction?.amount} CZK`;
            let date = document.createElement("div");
            let dateObject = new Date(transaction.date);
            console.log(dateObject);
            date.innerText = `${dateObject.getDate()+1}. ${dateObject.getMonth()+1}. ${dateObject.getFullYear()}`;
            item.id = `tran-${transaction.id}`;
            item.classList.add("transaction-item");
            item.appendChild(amount);
            item.appendChild(date);
            htmlList.appendChild(item);
        }
        let sum = this.transactions.map(item => item.amount).reduce((prev, next) => prev + next);
        document.getElementById("balance-amm").innerText = `${sum} CZK`;
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
            const target = e.target;
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