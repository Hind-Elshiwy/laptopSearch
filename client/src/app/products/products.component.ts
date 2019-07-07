import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from './product.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productservice: ProductsService, private router: Router ) { }
  public url= "";
  public q;
  public ram;
  public cpu;
  public opsys;
  public inches;
  public products:Product[];
  public serverErrorMessages;
  ngOnInit() {
  }

  onSubmit(form: NgForm){
    console.log(form.value)
    if(form.value.query){
      this.url = "?q=" + form.value.query
      let filters = []
      if(form.value.ram) {
        this.url += "&filters[ram]=" + form.value.ram
      }

      if(form.value.cpu) {
        this.url += "&filters[cpu]=" + form.value.cpu
      }

      if(form.value.opsys) {
        this.url += "&filters[opsys]=" + form.value.opsys
      }

      if(form.value.inches) {
        this.url += "&filters[inches]=" + form.value.inches
      }
    }
    this.router.navigateByUrl('/products'+this.url); 
    this.productservice.getProducts(this.url).subscribe(
      res=>{
       this.products=res; 
      },
      err=>{
        this.serverErrorMessages = err.error.message;
      }
    )
  }


  ngAfterViewInit(){
    document.body.className="products";
  }
}
