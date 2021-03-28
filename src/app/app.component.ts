import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppComponentService } from "./app.component.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  result1: any;
  result2: any;
  formChange: FormGroup;
  isLoading: boolean = false;
  constructor(
    private appComponentService: AppComponentService,
    private formBuilder: FormBuilder
  ) {
    this.formChange = this.formBuilder.group({
      quote: ["", Validators.required]
    });
  }
  ngOnInit() {}
  addQuote() {
    this.isLoading = true;
    if (this.formChange.value.quote) {
      this.result1 = this.formChange.value.quote;
    }
    const data: any = {
      quote: this.result1
    };

    this.appComponentService.addQuoteToServ(data).subscribe(
      res => {
        console.log(res);
        this.formChange.reset();
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }
  getRandomQuote() {
    this.isLoading = true;
    this.appComponentService.getQuotes().subscribe(
      res => {
        console.log(res);
        this.result2 = res[Math.floor(Math.random() * res.length)];
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }
}
