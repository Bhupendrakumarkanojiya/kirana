import { Router } from '@angular/router';
import { ShopService } from './shop.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
   providers:[ShopService]
})
export class ShopComponent implements OnInit {
  public listShop = [];
  constructor(@Inject(ShopService) private shopService:ShopService, private router: Router) { }

  ngOnInit() {
    this.getShopList();
  }


getShopList () {
  this.shopService.getShopList().then(data=>{
      this.listShop = JSON.parse(data['_body']);

      console.log(this.listShop)
     
    })
}

redirectToProduct(shopId){
  this.router.navigate(['products',shopId]);
}

}
