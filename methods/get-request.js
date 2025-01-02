module.exports = (req, res) => {
    let baseurl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    console.log(baseurl);
    let id = req.url.split("/")[3];
    console.log(id);

    // cehcking VALIDATION
    const regexv4 = new RegExp(/^([+-]?\d{1,10})$/);
    let check = regexv4.test(id);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods",  "GET, POST, DELETE, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("content-type", "application/json");
    
    if(req.url === "/api/contacts") {
        res.statusCode == 200;
        // res.writeHead(200, {"content-type": "application/json"});
        res.write(JSON.stringify(req.contacts));
        res.end();
    } else if (baseurl == "/api/contacts" && !regexv4.test(id)){
        res.writeHead(404, {"content-type": "application/json"});
        res.end(JSON.stringify({title: "Validation Failed", message: "Contact ID Not Found"}));
    } else if (baseurl == "/api/contacts/" && regexv4.test(id)){
        
        let filteredContact = req.contacts.filter((contact) => {
            return contact.id == id;
        });

        console.log(filteredContact);

        if(filteredContact.length > 0) {
            res.statusCode == 200;
            res.write(JSON.stringify({title: "done", message: filteredContact}));
        }else{
            res.writeHead(404, {"content-type": "application/json"});
            res.end(JSON.stringify({title: "error", message: "Request Contact Not Found"}));
        }
        
        res.end();
    } else{
        res.writeHead(404, {"content-type": "application/json"});
        res.end(JSON.stringify({title: "Not Found", message: "Route Not Found Please Enter Valid URL"}));
    }
}