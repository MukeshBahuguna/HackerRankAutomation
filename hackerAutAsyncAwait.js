const puppeteer= require("puppeteer");

const loginLink="https://www.hackerrank.com/auth/login";
const email="xocovo5793@shirulo.com";
const pass="password";

//iife-> immideatly invoked function expression ->call function then and there 

(async function (){
    try {
        const browserInst= await puppeteer.launch({
            headless:false,
            args:["--start-maximized"], 
            defaultViewport:null
        });
    let newTab =await browserInst.newPage();
    await newTab.goto(loginLink);
    await newTab.type("input[type='text']" ,email ,{delay :50});
    await newTab.type("input[type='password']" ,pass ,{delay :50});
    await newTab.click("button[type='submit']" ,{delay:50});
    await waitAndClick(".topic-card a[data-attr1='algorithms']" , newTab);
                                        // await newTab.waitForTimeout(3000);
    await waitAndClick("input[value='warmup']" , newTab );
    await waitAndClick("input[value='unsolved']" , newTab );
    let arr= await newTab.$$(".challenge-submit-btn button",{delay :50});
                                        // console.log(arr.length);
                                        // await newTab.waitForTimeout(3000);
    await questionClicker(arr[0] ,newTab);

    } catch (error) {
        console.log(error);
    }
})();

async function waitAndClick(selector, cPage){
    await cPage.waitForSelector(selector);
    let selectorclick= cPage.click(selector);
    return selectorclick;
}  
async function questionClicker(question,newTab ){
    await question.click();
    let editor= waitAndClick(".monaco-scrollable-element.editor-scrollable.vs" ,newTab);
    return editor;
}