const puppeteer= require("puppeteer");

let page;
const loginLink="https://www.hackerrank.com/auth/login";
// puppeteer.launch(); //browser opening promise;
const email="xocovo5793@shirulo.com";
const pass="password"

//to open chromium
const browserOpenPromise= puppeteer.launch({
    headless:false,
    args:["--start-maximized"], //look at docs
    defaultViewport:null
});

browserOpenPromise
    .then(function (browser) {  //page getter promise
        const pagePromise= browser.pages(); //opened pages/tabs  or, you can use.newPage() and then next step would be--> browPages;
        return pagePromise; //new instance returned

    }).then(function (browPages){
        page=browPages[0];
        const gotoPromise=page.goto(loginLink);
        return gotoPromise;

    }).then (function (){  //good practice to put this
        let elementWait=page.waitForSelector("input[type='text']", {visible:true});
        return elementWait;

    }).then(function(){
        let keysWillbeSentPromise=page.type("input[type='text']" ,email ,{delay :10});
        return keysWillbeSentPromise;
    
    }).then (function (){  //good practice to put this
        let elementWait=page.waitForSelector("input[type='password']", {visible:true});
        return elementWait;

    }).then(function(){
        let keysWillbeSentPromise=page.type("input[type='password']" ,pass ,{delay :10});
        return keysWillbeSentPromise;

    }).then(function(){
        let buttonCliked=page.click("button[type='submit']" ,{delay:50});
        return buttonCliked;

    }).then(function(){
        let clickOnAlg=waitandclick(".topic-card a[data-attr1='algorithms']" , page);
        return clickOnAlg;

    }).then(function(){
        let waitfor3sec= page.waitFor(3000);
        return waitfor3sec;

    }).then(function(){
        let clickWarmup= waitandclick("input[value='warmup']" , page );
        return clickWarmup;

    }).then(function(){
        let waitfor3sec= page.waitFor(3000);
        return waitfor3sec;

    }).then(function(){
        return waitandclick("input[value='unsolved']" ,page);
    
    }).then(function(){
        let waitfor3sec= page.waitFor(3000);
        return waitfor3sec;

    }).then(function(){
        //$ means document.querySelector.
        //$$ means document.querySelector.all()
        let allChallanges=page.$$(".challenge-submit-btn button",{delay :50});
        return allChallanges;

    }).then(function(arr){
        let qClicker=questionClicker(arr[0]);

    }).catch(function(err){ //to catch error
        console.log(err);

    })
console.log("after");
 

// waitandclick in place of waitForSelector()
function waitandclick(selector, cPage){
    return new Promise(function (resolve ,reject){
        let wait= cPage.waitForSelector(selector);
        wait.then(function(){
            let clickModel = cPage.click(selector);
            return clickModel;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    });
}  

function questionClicker(question ){
    return new Promise(function(resolve ,reject){
        let clickQ= question.click();
        clickQ.then(function(){
            let editor= waitandclick(".monaco-scrollable-element.editor-scrollable.vs" ,page);
            return editor;
            
        }).then(function(){
            resolve();
        }).catch(function (err){
            reject();
        })

    });
}