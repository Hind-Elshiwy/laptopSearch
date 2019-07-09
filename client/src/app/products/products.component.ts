import { Component, OnInit, HostListener } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from './product.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../user/user.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private productservice: ProductsService,private UserService: UserService, private router: Router, 
    private route: ActivatedRoute ) { }
  public url= "";
  public q;
  public ram;
  public cpu;
  public opsys;
  public inches;
  public products:Product[];
  public serverErrorMessages;
  public filters = false
  public isMobileResolution: boolean;
  userDetails;
  error;

  @HostListener('window:resize')
    onWindowResize() {
      console.log(window.innerWidth)
      if (window.innerWidth < 768) {
        this.isMobileResolution = true;
      } else {
        this.isMobileResolution = false;
      }
    }
  ngOnInit() {

    this.UserService.getUser().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        this.error = err.message;
      }
    );

    console.log(this.route.snapshot.queryParamMap)
    if(this.route.snapshot.queryParamMap.has('q')) {
      this.q = this.route.snapshot.queryParamMap.get('q')
      if(this.route.snapshot.queryParamMap.has('filters[ram]')) {
        this.ram = this.route.snapshot.queryParamMap.get('filters[ram]')
      }
      if(this.route.snapshot.queryParamMap.has('filters[cpu]')) {
        this.cpu = this.route.snapshot.queryParamMap.get('filters[cpu]')
      }
      if(this.route.snapshot.queryParamMap.has('filters[opsys]')) {
        this.opsys = this.route.snapshot.queryParamMap.get('filters[opsys]')
      }
      if(this.route.snapshot.queryParamMap.has('filters[inches]')) {
        this.inches = this.route.snapshot.queryParamMap.get('filters[inches]')
      }
      this.onSubmit()
    }
  }

  toggleFilters() {
    this.filters = this.filters == false ? true : false
    if(!this.filters) {
      this.ram = null;
      this.cpu = null;
      this.opsys = null;
      this.inches = null;
    }
  }

  onSubmit(){
    if(this.q){
      this.url = "?q=" + this.q
      if(this.ram) {
        this.url += "&filters[ram]=" + this.ram
      }

      if(this.cpu) {
        this.url += "&filters[cpu]=" + this.cpu
      }

      if(this.opsys) {
        this.url += "&filters[opsys]=" + this.opsys
      }

      if(this.inches) {
        this.url += "&filters[inches]=" + this.inches
      }
    } 
    else {
      this.url = ""
      this.products = []
      this.router.navigateByUrl('/products'); 
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

  onLogout() {
    this.UserService.deleteToken();
    this.router.navigate(['/login']);
  }

 
  ngAfterViewInit(){
    document.body.className="products";
  }
}
