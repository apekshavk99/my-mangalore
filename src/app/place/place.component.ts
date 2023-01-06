import { Component, OnInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit{

  userActivity: any;
  userInactive: Subject<any> = new Subject();
  idleTime: number = 0

  @HostListener("document:keyup", ["$event"])
  @HostListener("document:click", ["$event"])
  @HostListener("document:wheel", ["$event"])
  @HostListener("document:scroll", ["$event"])
  @HostListener("document:mousemove", ["$event"])
  refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

  ngOnInit(): void {
      window.addEventListener("message", this.handleOriantation);
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), this.idleTime * 1000);
  }

  handleOriantation = (msg: any) => {
    const iframe = document.getElementById("chatbot") as HTMLIFrameElement
    if (msg.origin === "https://dcb1.camiesandbox.com") {
      var postableEvt = msg && msg.data && msg.data.evtName ? msg.data : null;
      console.log("msg", msg)
      console.log("postableEvt", postableEvt)
      if (postableEvt && iframe) {
        if (postableEvt.evtName === "loaded") {
          iframe?.contentWindow?.postMessage({
            evtName: "iframe",
            autoLaunch: false,
          }, "*");
        } else if (postableEvt.evtName === "popup-idle") {
          this.idleTime = Number(postableEvt.behaviour);
          this.setTimeout();
          this.userInactive.subscribe(() => {
            iframe.contentWindow?.postMessage({
              evtName: "idle-window",
            }, "*");
          });
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

  }
}
