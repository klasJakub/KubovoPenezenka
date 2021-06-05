class KubovoPenezenka {


    //test

    constructor() {
        this.startDate = new Date('2020-01-01T01:00:00');
        this.today = new Date();
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
            this.saveTransactionsToStorage();
        } else {
            this.transactions = JSON.parse(localStorage.getItem("transactions"));
        }
        console.log(this.transactions);
        this.generateListItemsFromTransactions();
        this.colorModeListeners();
        document.getElementById("add-money").addEventListener("click", (e) => {
            e.preventDefault();
            let transaction = this.generateTransaction(false, true);
            let id = Math.max(...this.transactions.map(t => t.id)) + 1;
            this.transactions.push({...transaction, id});
            this.saveTransactionsToStorage();
            this.generateListItemsFromTransactions();
        });
        document.getElementById("send-money").addEventListener("click", (e) => {
            e.preventDefault();
            let transaction = this.generateTransaction(true, true);
            let id = Math.max(...this.transactions.map(t => t.id)) + 1;
            this.transactions.push({...transaction, id});
            this.saveTransactionsToStorage();
            this.generateListItemsFromTransactions();
        })
    }

    generateRandomTransactions() {
        let transactions = [];
        for (let i = 0; i < Math.floor(Math.random() * 100); i++) {
            transactions.push({...this.generateTransaction(Math.random() < 0.5, false), id: i});
        }
        return transactions;
    }

    saveTransactionsToStorage() {
        localStorage.setItem("transactions", JSON.stringify(this.transactions.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        })));
    }

    generateTransaction(negative, today) {
        let amount, date;
        if (negative) {
            amount = -Math.floor(Math.random() * 100);
        } else {
            amount = Math.floor(Math.random() * 100);
        }
        if (today) {
            date = new Date();
        } else {
            date = new Date(this.startDate.getTime() + Math.random() * (this.today.getTime() - this.startDate.getTime()));
        }
        return {amount, date};
    }

    sendListener() {
    }

    generateListItemsFromTransactions() {
        const htmlList = document.getElementById("transaction-list");
        while (htmlList.firstChild) {
            htmlList.removeChild(htmlList.lastChild);
        }
        for (let transaction of this.transactions) {
            let item = document.createElement("li");
            let amount = document.createElement("div");
            amount.innerText = `${transaction?.amount} CZK`;
            let date = document.createElement("div");
            let dateObject = new Date(transaction.date);
            console.log(dateObject);
            date.innerText = `${dateObject.getDate() + 1}. ${dateObject.getMonth() + 1}. ${dateObject.getFullYear()}`;
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
            this.themeSwitch.checked = element.id === "dark";
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