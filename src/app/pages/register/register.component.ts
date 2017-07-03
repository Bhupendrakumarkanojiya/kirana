import { RegisterService } from './register.service';
import { Component, Directive } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';

@Component({
  selector: 'register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {

  public form:FormGroup;
  public name:AbstractControl;
  public shopName:AbstractControl;
  public email:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;

  public submitted:boolean = false;

  constructor(fb:FormBuilder, private registerService:RegisterService) {

    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'shopName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.shopName = this.form.controls['shopName'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
       console.log(values);


      var shop = {};
      shop['name'] = [{'value':values['name']}];
      shop['field_shop_name_original'] = [{'value':values['shopName']}];
      shop['mail'] = [{'value':values['email']}];
      shop['roles'] = [{'target_id':'authenticated'}];
      shop['pass'] = [{'value':values['passwords']['password']}];
      shop['status'] = [{'value':'1'}];

      shop['_links'] = {"type":{"href":"http://www.dialmarts.com/dms/rest/type/user/user"}};
      let data = JSON.stringify(shop);

      this.registerService.createShop(data).then(data=>{
        console.log(data);
      })
  /*    
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/hal+json"
  },*/
       //this.http.post(url,values,{header:header})
    }
  }
}
