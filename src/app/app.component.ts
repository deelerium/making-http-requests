import { Component } from "@angular/core";
import { AppComponentService } from "./app.component.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  quote: any;
  result1: any;
  result2: any;

  constructor(private appComponentService: AppComponentService) {}
  ngOnInit() {}
  addQuote() {
    this.result1 = this.quote;
    this.quote = "";
    const data: any = {
      quote: this.result1
    };

    this.appComponentService.addQuoteToServ(data).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
  getRandomQuote() {
    this.appComponentService.getQuotes().subscribe(
      res => {
        console.log(res);
        this.result2 = res[Math.floor(Math.random() * res.length)];
      },
      err => {
        console.log(err);
      }
    );
  }
}
