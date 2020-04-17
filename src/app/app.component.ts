import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './material.css']
})
export class AppComponent implements OnInit {

  links: any = [
    {
      country: "sri lanka",
      amount: "454"
    },
    {
      country: "america",
      amount: "4540"
    }, {
      country: "braxil",
      amount: "54"
    },
    {
      country: "uk",
      amount: "456"
    },
    {
      country: "Gahana",
      amount: "100"
    }, {
      country: "india",
      amount: "4562"
    }
  ]


  title = 'corona';
  valuesSriLanka: ValuesSriLanka = {
    id: "",
    countryName: "",
    totalCases: "",
    newCases: "",
    activeCases: "",
    totalDeaths: "",
    newDeaths: "",
    totalRecovered: "",
    seriousCritical: "",
    region: null,
    totalCasesPer1m: "",
    recordDate: ""
  }

  constructor(private appService: AppService) {

  }

  ngOnInit() {
    this.appService.getCoronaData().subscribe((data) => {
      console.log(data['latest_stat_by_country'][0]);
      this.valuesSriLanka.countryName = data['latest_stat_by_country'][0].country_name;
    }, (error) => {
      console.log(error);
    });

    // this.appService.getCoronaSafetyInstruction().subscribe((data) => {
    //   // console.log(data['latest_stat_by_country'][0]);
    //   console.log("2 nd call "+data.text())
    //   this.createImageFromBlob(data);
    // }, error => {
    //   console.log(error);
    // });

    // setInterval(() => {
    //   console.log('HI')
    // }, 1000)

  }
  onKey($event){
    console.log(event.target["value"]);
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
  }


}
export interface ValuesSriLanka {
  id: string
  countryName: string
  totalCases: string
  newCases: string
  activeCases: string
  totalDeaths: string
  newDeaths: string
  totalRecovered: string
  seriousCritical: string
  region: null
  totalCasesPer1m: string
  recordDate: string
}

