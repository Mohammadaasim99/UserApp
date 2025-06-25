import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { CountryService } from '../../../../core/services/country.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-create-user',
  standalone:false,
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  countries: string[] = [];

  constructor(
    private userService: UserService,
    private countryService: CountryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  onSubmit(userForm:User): void {
    if (userForm) {
      this.userService.createUser(userForm);
      this.router.navigate(['/users']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}
