import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(){
    window.addEventListener("scroll", this.reveal);
  }

  ngOnInit(): void {
    const iframe = document.getElementById("chatbot") as HTMLIFrameElement
    // document.getElementById("extraIcon").addEventListener("click", function () {
      window.addEventListener("message", function (msg) {
        if(msg.origin === "https://dcb2.camiesandbox.com"){
          var postableEvt = msg && msg.data && msg.data.evtName ? msg.data : null;
          console.log("msg", msg)
          console.log("postableEvt", postableEvt)
          if (postableEvt && iframe) {
            if(postableEvt.evtName === "loaded"){
              iframe?.contentWindow?.postMessage({
                evtName: "iframe",
                autoLaunch: false,
              }, "*");
            }
            else if (postableEvt.evtName === "chatwindow") {
              iframe.classList.add("chat-window");
              iframe.classList.remove("chat-btn");
              iframe.classList.remove("chat-expand");
    
            } else if (postableEvt.evtName == "expand") {
              iframe.classList.add("chat-expand");
              iframe.classList.remove("chat-window");
              iframe.classList.remove("chat-btn");
            } else {
              iframe.classList.add("chat-btn");
              iframe.classList.remove("chat-window");
              iframe.classList.remove("chat-expand");
            }
          }
          iframe?.contentWindow?.postMessage({
            call: "pageURL",
            value: document.location.href
          }, "*");
        }

      });
  }

  reveal(){
    let sectionContainer = document.getElementById("sec3");
    if(sectionContainer){
      let windowHeight = window.innerHeight;
      let elementTop = sectionContainer.getBoundingClientRect().top;
      let elementVisible = 150;
      if(elementTop< windowHeight - elementVisible){
        sectionContainer.classList.add("active");
      } else{
        sectionContainer.classList.remove("active")
      }
    }
  }

}
