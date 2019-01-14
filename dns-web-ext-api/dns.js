'use strict';

class DoH {

    resolve(hostname, type) {
        return new Promise((resolve, reject) => {
            fetch('https://cloudflare-dns.com/dns-query?name=' + hostname + '&type=' + type, {
                headers: {
                    'accept': "application/dns-json"
                }
            })
            .then(response => response.json())
            .then(responseJson => {
                let addresses = [];
                const responseAnswers = responseJson.Answer;
                for (let a of responseAnswers) {
                    addresses.push(a.data);
                }
                resolve({
                    "addresses": addresses
                });
            })
            .catch(e => {
                reject("ERROR: There was an error processing the DNS resolve request.\n'" + e + "'");
            });
        });
    }

}

// if (window.chrome) {
//     window.chrome.permissions.contains({
//         permissions: ["dns"]
//     }, (result) => {
//         if (result) {
//             window.chrome.doh = DoH(providers.CLOUDFLARE);
//         } else {
//             console.error("The webextension does not have the 'dns' permission");
//         }
//     });
// } else if (window.browser) {
//     window.browser.permissions.contains({
//         permissions: ["dns"]
//     }).then((result) => {
//         if (result) {
//             window.browser.doh = DoH(providers.CLOUDFLARE);;
//         } else {
//             console.error("The webextension does not have the 'dns' permission");
//         }
//     });
// }
