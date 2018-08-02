export default class Api {
    constructor(page, options, headers, callbackSuccess) {
        this.options = options;
        this.url = "http://localhost:4000/" + page + "?";
        let index = 0;

        for (let optionKey in this.options) {
            this.url += (this.url === "" || index === 0) ? "" : "&";

            if (typeof this.options[optionKey] === "object") {
              this.options[optionKey].forEach((item, key) => {
                this.url += optionKey + "=" + encodeURIComponent(item);

                if (key !== this.options[optionKey].length-1) {
                  this.url += "&";
                }
              });
            } else {
              this.url += optionKey + "=" + encodeURIComponent(this.options[optionKey]);
            }

            index++;
        }

        fetch(this.url, headers)
            .then(response => response.json())
            .then(response => callbackSuccess(response));
    }
}