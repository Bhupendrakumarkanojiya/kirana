import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dmshop',
  templateUrl: './dmshop.component.html',
  styleUrls: ['./dmshop.component.scss']
})
export class DmshopComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    console.log("dm shop ")
  }
  registerShop(){
    //console.log( window.location)
    window.location.href='dmadmin/register';

    //this.router.navigate(['./register'])
    
  }
}
